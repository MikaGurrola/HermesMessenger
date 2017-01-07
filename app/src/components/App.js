import React from 'react';
import base from '../base.js';

import MessageList from './MessageList';
// import MessageListPreview from './MessageListPreview';

class App extends React.Component {
	constructor(){
		super();
		this.renderLogin = this.renderLogin.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
		this.renderMessages = this.renderMessages.bind(this);

		this.state = {
			user: {},
			messages: {}
		}
	}

	componentWillMount() {
		base.fetch(`/${this.props.params.chatRoom}/messages`, {
			context: this, 
			asArray: true,
			then(data) {
				// console.log(data);
				this.setState({
					messages: data,
				});
			}
		});
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

	logout(){
		base.unauth();
		this.setState({ uid: null });
		this.context.router.transitionTo(`/`);
	}

	changeRoom() {
		event.preventDefault();
		// console.log("You changed the url");
		this.setState({
			uid: this.state.uid,
			pic: this.state.pic,
			name: this.state.name
		});
		// this.context.router.transitionTo(`/`);
		this.context.router.replaceWith('/');
	}

	renderLogin() {
		return(
			<div className="card">
				<h1>If you wanna join the chat log in, so stop being a creeper and just do it 👇</h1>
				<button onClick={() => this.authenticate('google')}>Google</button>
			</div>
		)
	}

	renderMessages(key) {
		const message = this.state.messages[key];
		// console.log(message);
		return (
			<li key={key}>
				<p>{message.user} says {message.message}</p>
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
			<div className="card">
				<h1>You are loggined in</h1>
				{logout}
				{changeRoom}
				<MessageList chatRoom={this.props.params.chatRoom}  />
				<h1>{this.state.user.name}</h1>
				<img src={this.state.user.pic} alt=""/>
			</div>
		)
	}
}

App.contextTypes = {
	router: React.PropTypes.object
	// router: React.PropTypes.func.isRequired
}

export default App;