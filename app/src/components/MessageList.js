import React from 'react';
import base from '../base';

class MessageList extends React.Component {
	constructor() {
		super();
		this.renderMessages = this.renderMessages.bind(this);
	}

	componentWillMount() {
		this.ref = base.listenTo(`/${this.props.params.chatRoom}/messages`, {
			context: this, 
			asArray: true,
			then(data) {
				// console.log(data);
				this.setState({messages: data});
			}
		});
		// console.log(this.state.messages);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
	// TODO : Can I pull this function from App component?
	renderMessages(key) {
		const message = this.props.messages[key];
		// console.log(message);
		return (
			<li className="message" key={key}>
				<img src={message.image}  alt={"This is an image of " + message.user + " the great!"} />
				<p>{message.user} says {message.message}</p>
			</li>
		)
	}

	render() {
		return(
			<div className="message-list">
				<ul >
					{Object.keys(this.props.messages).map(this.renderMessages)}
				</ul>
			</div>
		)
	}
}

MessageList.contextTypes = {
	router: React.PropTypes.object
}

MessageList.propTypes = {
	params: React.PropTypes.object.isRequired,
	messages: React.PropTypes.object.isRequired
}

export default MessageList;