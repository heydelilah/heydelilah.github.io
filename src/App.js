import React, {Component} from "react";

import ReactMarkdown from "react-markdown";
import list from "../output/list.json";
import hljs from "./libs/highlight.min.js";

import './css/tomorrow-night-eighties.css';


// console.log(hljs)
// hljs.initHighlightingOnLoad();

class ListItem extends React.Component {
	render(){
		var articles = this.props.data.map((item, index) => 
			<li key={index} onClick={()=>this.props.onClick(item.id)}>
				<div>{item.title || item.filename }</div>
				<div>{item.date}</div>
			</li>
		)

		return(
			<ul>{articles}</ul>
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
			isShow: true,
			content: ''
		};
	}
	back(){
		this.setState({
			isShow: true,
			content: ''
		});
	}
	toggle(id){

		const record = list.older_articles.find((n)=>{
			return n.id === id;
		});
		
		this.setState({
			isShow: false,
			content: record.content
		});
	}
	render(){
		return (<div>
			{this.state.isShow ? <ListItem data={list.older_articles} onClick={(i)=>this.toggle(i)} /> :
			<Post content={this.state.content} onClick={()=>this.back()} />	
			}
		</div>)
	}
}

export default App;