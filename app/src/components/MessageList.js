import React from 'react';
import base from '../base';

class MessageList extends React.Component {
	constructor() {
		super();
		this.renderMessages = this.renderMessages.bind(this);
	}

	componentDidMount() {
		this.ref = base.syncState(`/${this.props.params.chatRoom}/messages`
			, {
				context: this,
				state: 'messages'
			});
	}

	componentWillUpdate(nextState) {
		this.node.scrollIntoView();
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
				<p>{message.message}</p>
			</li>
		)
	}

	render() {
		return(
			<div className="message-list">
				<ul >
					{Object.keys(this.props.messages).map(this.renderMessages)}
					<li ref={node => this.node = node} className="bottom"></li>
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