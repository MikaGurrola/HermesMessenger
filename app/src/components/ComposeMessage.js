import React from 'react';
// import base from '../base';

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
				<h1>ComposeMessage Component</h1>
				<form ref={(input) => this.messageForm = input} className="" onSubmit={(e) => this.createMessage(e)}>
					<input ref={(input) => this.message = input } type="text" placeholder="Hello World"/>
					<button type="submit">Send</button>
				</form>
				<p>{this.props.user.name}</p>
				<img src={this.props.user.pic} alt=""/>
			</div>
		)
	}
}


export default ComposeMessage;