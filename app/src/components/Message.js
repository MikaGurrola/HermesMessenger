import React from 'react';

class Message extends React.Component {
	render() {
		// if no user data display the limited message data
		if(!this.props.user.uid){
			return  (
					<li className="message">
			 			<p>Someone says {this.props.details}</p>
			 		</li>
			 )
		}

		return(
			<li className="message">
	 			<img src={this.props.details.image} alt={"This is an image of " + this.props.details.user + " the great!"}/>
	 			<p>{this.props.details.message}</p>
	 		</li>
		)
	}
}

export default Message;