import React from 'react';
import base from '../base';

class MessageList extends React.Component {
	constructor() {
		super();
		this.renderMessages = this.renderMessages.bind(this);
		this.state = {
			messages : ''
		}
	}

	componentWillMount() {
		this.ref = base.listenTo(`/${this.props.chatRoom}/messages`, {
			context: this, 
			asArray: true,
			then(data) {
				console.log(data);
				this.setState({messages: data});
			}
		});
		// console.log(this.state.messages);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// TODO : Pull this function from App component
	renderMessages(key) {
		const message = this.state.messages[key];
		// console.log(message);
		return (
			<li key={key}>
				<p>{message.user} says {message.message}</p>
			</li>
		)
	}

	render() {
		return(
			<div>
				<h1>MessageList Component</h1>
				<ul>
					{Object.keys(this.state.messages).map(this.renderMessages)}
				</ul>
			</div>
		)
	}
}

MessageList.contextTypes = {
	router: React.PropTypes.object
}

export default MessageList;