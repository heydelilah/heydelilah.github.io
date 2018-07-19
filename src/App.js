import React, {Component} from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import ReactMarkdown from "react-markdown";
import list from "../output/list.json";
import hljs from "./libs/highlight.min.js";
import {hot} from "react-hot-loader";

import './App.css';
import './css/highlight.css';
import './css/tomorrow-night-eighties.css';



class ListItem extends React.Component {
	render(){
		const start = this.props.pageCounter*this.props.pageNumber;
		const postData = list.older_articles.slice(start, start+this.props.pageNumber);
		
		var articles = postData.map((item, index) => 
			<li className="PostItem" 
				key={index} >
				<div className="PostImage"><img src={'./'+item.imgUrl}/></div>
				<div className="PostMain">
					<div className="PostTitle" onClick={()=>this.props.onClick(item.id)}>{item.title || item.filename }</div>
					
					<div className="PostInfo">
						<div className="PostDate">
							<span className="iconfont">&#xe697;</span>
							<span>{item.date}</span>
						</div>
						<div className="PostTag">
							<span className="iconfont">&#xe6a5;</span>
							<span>{item.tag}</span>
						</div>
					</div>

					<div className="PostDesc">
						{item.desc}
					</div>
				</div>
			</li>
		)

		return(
			<ul className="PostList">{articles}</ul>
		);

	}	
}


class Post extends Component{
	render(){
		return (
			<div>
				<button onClick={()=>this.props.onClick()}>Back</button>
				<ReactMarkdown source={this.props.content} />
			</div>
		)
	}
	componentDidMount(){
		const dom = ReactDOM.findDOMNode(this);
		$(dom).find('pre code').each(function(i, block) {
  			hljs.highlightBlock(block);
		});

	}
}

class Pager extends Component{
	render(){
		const showPre = this.props.current <= 0 ? false: true;
		const showNext = this.props.current+1 >= this.props.amount ? false : true;
		
		return (
			<div className="PostPager">
				<button 
					className={showPre?'':'hide'}
					onClick={()=>this.props.onClick("pre")}>上一页</button>
				<span> 第 {this.props.current+1} 页 </span>
				<button 
					className={showNext?'':'hide'}
					onClick={()=>this.props.onClick("next")}>下一页</button>
			</div>
		)
	}

}


class App extends Component{
	constructor(){
		super();

		this.pageNumber = 5;

		this.state = {
			isShowList: true,
			content: '',
			pageCounter: 0
		};
	}
	backToHome(){
		this.setState({
			isShowList: true,
			content: ''
		});
	}
	toggle(id){

		const record = list.older_articles.find((n)=>{
			return n.id === id;
		});
		
		this.setState({
			isShowList: false,
			content: record.content
		});
	}
	togglePager(type){
		var pageCounter = this.state.pageCounter;
		var amount = Math.ceil(list.older_articles.length/this.pageNumber)-1;
		if(type=="pre"){
			pageCounter--;
		}
		if(type=="next"){
			pageCounter++;
		}


		this.setState({
			pageCounter: pageCounter
		});
	}
	render(){
		var amount = Math.ceil(list.older_articles.length/this.pageNumber);

		return (<div className="main">

			<header onClick={()=>this.backToHome()}>Heydelilah</header>

			<div className="">
				{this.state.isShowList ? 
					<ListItem 
						pageCounter={this.state.pageCounter} 
						pageNumber = {this.pageNumber}
						onClick={(i)=>this.toggle(i)} /> :
					<Post content={this.state.content} onClick={()=>this.backToHome()} />	
				}
			</div>

			<Pager 
				amount={amount}
				current={this.state.pageCounter}
				onClick={(i)=>this.togglePager(i)}/>
			<footer>2018</footer>
		</div>)
	}
}

export default hot(module)(App);