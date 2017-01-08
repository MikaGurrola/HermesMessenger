import React from 'react';
class ComposeMessage extends React.Component {
	createMessage(event) {
		event.preventDefault();
		// console.log('Trying to write a message?');
		const message =  {
			user: this.props.user.name,
			image: this.props.user.pic,
			message: this.message.value
		}
		this.props.newMessage(message);
		this.messageForm.reset();
	}

	render() {
		return(
		<div>
			<div>
				<form className="compose-message" ref={(input) => this.messageForm = input} onSubmit={(e) => this.createMessage(e)}>
					<input ref={(input) => this.message = input } type="text" placeholder="Hello World"/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
		)
	}
}

ComposeMessage.propTypes = {
	user: React.PropTypes.object.isRequired,
	newMessage: React.PropTypes.func.isRequired
}

export default ComposeMessage;