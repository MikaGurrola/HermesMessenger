import React from 'react';

class ChatRoomPicker extends React.Component {

	gotToRoom(event) {
		event.preventDefault();
		console.log("You changed the url");
		// first grab the text from the box
		const chatRoom = this.chatRoomInput.value;
		console.log("Going to " + this.chatRoomInput.value);
		//second we are going to transition from / to /store/:storeID
		this.context.router.transitionTo(`/${chatRoom}`);
	}

	render() {
		return (
			<form className="" onSubmit={(e) => this.gotToRoom(e)} >
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
	router: React.PropTypes.object
}

export default ChatRoomPicker;