import React from 'react';

class Message extends React.Component {
	// constructor(){
	// 	super();

	// 	this.state = {
	// 		user: {}
	// 	}
	// }

	// componentWillUpdate(nextState) {
	// 	this.newestMessage.scrollIntoView();
	// }

	// componentDidMount() {
	// 	this.newestMessage.scrollIntoView();
	// }

	render() {
		if(!this.props.user.uid){
			return  <li className="message">
			 			<p>Someone says {this.props.details.message}</p>
			 		</li>
		}


		return(
			<li className="message">
	 			<img src={this.props.details.image} alt={"This is an image of " + this.props.details.user + " the great!"}/>
	 			<p>{this.props.details.message}</p>
	 		</li>
		)
	}
}

// MessageList.contextTypes = {
// 	router: React.PropTypes.object
// }

// MessageList.propTypes = {
// 	params: React.PropTypes.object.isRequired,
// 	messages: React.PropTypes.object.isRequired
// }

export default Message;






// import React from 'react';

// const Message = (props) => {
// 	return(
// 		<li className="message">
// 			<img src={props.details.image} alt={"This is an image of " + props.details.user + " the great!"}/>
// 			<p>{props.details.message}</p>
// 		</li>
// 	)
// }

// export default Message;