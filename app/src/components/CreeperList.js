import React from 'react';
import Message from './Message';

class CreeperList extends React.Component {
	componentWillUpdate(nextState) {
		this.newestMessage.scrollIntoView();
	}

	componentDidMount() {
		this.newestMessage.scrollIntoView();
	}

	render() {
		return(
			<div>
				<ul className="message-list">
					{
						Object
							.keys(this.props.messages)
							.map(key => <Message key={key} user={this.props.user} details={this.props.messages[key]} />)
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

export default CreeperList;