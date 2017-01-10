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
		this.props.sendMessage(message);
		this.messageForm.reset();
	}

	render() {
		return(
		<div>
			<div>
				<form className="compose-message" ref={(input) => this.messageForm = input} onSubmit={(e) => this.createMessage(e)}>
					<div className="group">
						<input required ref={(input) => this.message = input } type="text" />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Compose</label>
					</div>
					<button type="submit"><i className="material-icons">send</i></button>
				</form>
			</div>
		</div>
		)
	}
}

// ComposeMessage.propTypes = {
// 	user: React.PropTypes.object.isRequired
// }

export default ComposeMessage;