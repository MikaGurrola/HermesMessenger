import React from 'react';

class ChatRoomPicker extends React.Component {
	gotToRoom(event) {
		event.preventDefault();
		// console.log("You changed the url");
		const chatRoom = this.chatRoomInput.value;
		// console.log("Going to " + this.chatRoomInput.value);
		this.context.router.transitionTo(`/room/${chatRoom}`);
	}

	render() {
		return (
			<form className="room-picker" onSubmit={(e) => this.gotToRoom(e)} >
				<h2>Pick a Chat Room</h2>
				<select name="room" required ref={(input) => { this.chatRoomInput = input}}>
					<option value="red">red</option>
					<option value="green">green</option>
					<option value="blue">blue</option>
				</select>
				<button type="submit">Go to Chat room</button>
			</form>
		)
	}
}

ChatRoomPicker.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default ChatRoomPicker;