import React, {Component} from "react";

import ReactMarkdown from "react-markdown";
import list from "../output/list.json";
import hljs from "./libs/highlight.min.js";

import './App.css';
import './css/highlight.css';
import './css/tomorrow-night-eighties.css';


console.log(hljs)
hljs.initHighlightingOnLoad();

class ListItem extends React.Component {
	render(){
		var articles = this.props.data.map((item, index) => 
			<li className="PostItem" 
				key={index} 
				onClick={()=>this.props.onClick(item.id)}>

				<div className="PostTitle">{item.title || item.filename }</div>
				<div className="PostDate">
					<span className="iconfont">&#xe697;</span>
					{item.date}</div>
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
}


class App extends Component{
	constructor(){
		super();

		this.state = {
			isShowList: true,
			content: ''
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
	render(){
		return (<div className="main">

			<header onClick={()=>this.backToHome()}>Heydelilah</header>

			<div className="">
				{this.state.isShowList ? <ListItem data={list.older_articles} onClick={(i)=>this.toggle(i)} /> :
				<Post content={this.state.content} onClick={()=>this.backToHome()} />	
				}
			</div>

			<footer></footer>
		</div>)
	}
}

export default App;