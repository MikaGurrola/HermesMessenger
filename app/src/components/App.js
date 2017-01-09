import React from 'react';
import base from '../base.js';

import MessageList from './MessageList';
import ComposeMessage from './ComposeMessage';
// import Message from './Message';

class App extends React.Component {
	constructor(){
		super();
		this.renderLogin = this.renderLogin.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.state = {
			user: {},
			messages: {}
		}
	}

	// firebase syncing
	componentWillMount() {
		this.ref = base.syncState(`/${this.props.params.chatRoom}/messages`
			, {
				context: this,
				state: 'messages'
			});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentDidMount() {
		base.onAuth((user) => {
			if(user){
				this.authHandler(null, {user});
			}
		})
	}

	authenticate(provider) {
		// console.log(`trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData) {
		event.preventDefault();
		// console.log(authData); 
		if(err){
			console.error(err);
			return;
		}
		// console.log("I am " + authData.user.displayName);

		this.setState({
			user: {
			uid: authData.user.uid,
			pic: authData.user.photoURL,
			name: authData.user.displayName
			}
		});
	}

	logout() {
		base.unauth();
		this.setState({ uid: null });
		this.context.router.transitionTo(`/`);
	}

	changeRoom() {
		event.preventDefault();
		this.context.router.transitionTo(`/`);
	}

	sendMessage(message) {
		const messages = {...this.state.messages}
		const timestamp = Date.now();
		messages[`${timestamp}`] = message;
		// console.log(messages);
		this.setState({messages});
	}

	renderLogin() {
		return(
			<div className="bottom-nav">
				<span>If you wanna join the chat - log in and stop being a creeper 👇</span>
				<div className="login-buttons">
					<button className="google" onClick={() => this.authenticate('google')}>Google</button>
					<button className="twitter" onClick={() => this.authenticate('twitter')}>Twitter</button>
					<button className="facebook" onClick={() => this.authenticate('facebook')}>Facebook</button>
					<button className="github" onClick={() => this.authenticate('github')}>Github</button>
				</div>
			</div>
		)
	}

	renderMessages(key) {
		const message = this.state.messages[key];
		// console.log(message);
		return (
			<li className="message" key={key}>
				<p>Somebody says {message.message}</p>
			</li>
		)
	}

	render() {
		const logout = <button onClick={this.logout}><i className="material-icons">trending_flat</i></button>;
		const changeRoom = <button className="change-room" onClick={this.changeRoom}><i className="material-icons">import_export</i></button>;

		// check if they are not logged in at all
		if(!this.state.user.uid){
			return <div>
						<nav>
							{changeRoom}
						</nav>
						
						<ul className="message-list-anon">
							{Object.keys(this.state.messages).map(this.renderMessages)}
						</ul>
						{this.renderLogin()}
					</div>
		}

		return (
			<div className="">
				<nav>
					{changeRoom}
					<h3>{this.props.params.chatRoom}</h3>
					{logout}
				</nav>

				<MessageList 
					params={this.props.params} 
					messages={this.state.messages}
				/>
				<ComposeMessage 
					user={this.state.user}
					sendMessage={this.sendMessage}
				/>
			</div>
		)
	}
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
}

App.PropTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;