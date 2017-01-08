import React from 'react';
import base from '../base.js';

import MessageList from './MessageList';
import ComposeMessage from './ComposeMessage';

class App extends React.Component {
	constructor(){
		super();
		this.renderLogin = this.renderLogin.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
		this.newMessage = this.newMessage.bind(this);

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

	newMessage(message) {
		// console.log(message);
		base.push(`/${this.props.params.chatRoom}/messages`, {
			data : message,
			then(err){
				if(!err){
					console.log('The message has successfully been sent');
				}
			}
		})
	}

	renderLogin() {
		return(
			<div className="card">
				<h1>If you wanna join the chat log in, so stop being a creeper and just do it 👇</h1>
				<button onClick={() => this.authenticate('google')}>Google</button>
				<button onClick={() => this.authenticate('twitter')}>Twitter</button>
				<button onClick={() => this.authenticate('facebook')}>facebook</button>
				<button onClick={() => this.authenticate('github')}>github</button>
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
		const logout = <button onClick={this.logout}>Log Out!</button>;
		const changeRoom = <button onClick={this.changeRoom}>Change Room!</button>;

		// check if they are not logged in at all
		if(!this.state.user.uid){
			return <div>
						{changeRoom}
						<ul>
							{Object.keys(this.state.messages).map(this.renderMessages)}
						</ul>
						{this.renderLogin()}
					</div>
		}

		return (
			<div className="">
				<h1>Main app component && You are loggined in</h1>
				{logout}
				{changeRoom}
				<MessageList 
					params={this.props.params} 
					messages={this.state.messages}
				/>
				<ComposeMessage 
					user={this.state.user} 
					newMessage={this.newMessage}
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