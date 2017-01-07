import React from 'react';
import base from '../base';

class MessageListPreview extends React.Component {
	constructor() {
		super();

		this.renderMessages = this.renderMessages.bind(this);

		this.state = {
			messagePreview : {}
		}
	}

	componentWillMount() {
		base.fetch(`/${this.props.chatRoom}/messages`, {
			context: this, 
			asArray: true,
			then(data) {
				console.log(data);
				this.setState({
					messagePreview: data,
				});
			}
		});
	}

	renderMessages(key) {
		const message = this.state.messagePreview[key];
		console.log(message);
		return (
			<li key={key}>
				<p>{message.user} : {message.message}</p>
			</li>
		)
	}

	render() {
		return(
			<div>
				<h1>MessageListPreview Component</h1>
				<ul>
					{Object.keys(this.state.messagePreview).map(this.renderMessages)}
				</ul>
			</div>
		)
	}
}

MessageListPreview.contextTypes = {
	router: React.PropTypes.object
}

export default MessageListPreview;