import React from 'react';
import Message from './Message';

class MessageList extends React.Component {

	componentWillUpdate(nextState) {
		this.newestMessage.scrollIntoView();
	}

	componentDidMount() {
		this.newestMessage.scrollIntoView();
	}

	render() {
		// if user is logged in send all message details name, pic & message
		// if not logged in send only the message
		if(!this.props.user.uid){
			return  (
				<div>
					<ul className="message-list">
						{
							Object
								.keys(this.props.messages)
								.map(key => <Message  key={key} user={this.props.user} details={this.props.messages[key].message} />)
						}
					</ul>
					<div className="bottom-anon" ref={node => this.newestMessage = node} />
				</div>
			 )
		}
		return(
			<div>
				<ul className="message-list">
					{
						Object
							.keys(this.props.messages)
							.map(key => <Message  key={key} user={this.props.user} details={this.props.messages[key]} />)
					}
				</ul>
				<div className="bottom" ref={node => this.newestMessage = node} />
			</div>
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

export default MessageList;