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
		
		var articles = this.props.data.map((item, index) => 
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
		return (
			<div>
				<button onClick={()=>this.props.onClick("pre")}>Pre</button>
				<span>{this.props.current}</span>
				<button onClick={()=>this.props.onClick("next")}>Next</button>
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


		const postData = list.older_articles.slice(this.state.pageCounter, this.pageNumber);

		console.log(list.older_articles.length, this.state.pageCounter, this.pageNumber)
		return (<div className="main">

			<header onClick={()=>this.backToHome()}>Heydelilah</header>

			<div className="">
				{this.state.isShowList ? <ListItem data={postData} onClick={(i)=>this.toggle(i)} /> :
				<Post content={this.state.content} onClick={()=>this.backToHome()} />	
				}
			</div>

			<Pager 
				data={postData}
				current={this.state.pageCounter+1}
				onClick={(i)=>this.togglePager(i)}/>
			<footer>2018</footer>
		</div>)
	}
}

export default hot(module)(App);