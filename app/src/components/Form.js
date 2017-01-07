import React from 'react';
import base from '../base';

class Form extends React.Component{

	signUp(event){
		event.preventDefault();
		console.log("lets sign up a user!");
		// STORE THE USER INPUT INTO AN OBJECT
		const user = {
			email: this.email.value,
			pass: this.pass.value
		}

		// ADD USER TO FIREBASE
		const immediatelyAvailableReference = base.push('users', 
		{
			data: 
			{	
				email: user.email, 
				pass: user.pass
			}

		});

		// available immediately, you don't have to wait for the callback to be called 
		const generatedKey = immediatelyAvailableReference.key;
		// log the firebase generated key (it's unique)
		console.log(generatedKey);

		// RESET THE FORM
		this.signUpForm.reset();

		console.log('You signed up with ' + user.email);
	}

	render(){
		return (
			<div>
				<h1>Formy Form</h1>
				<form ref={(input) => this.signUpForm = input}onSubmit={(e) => this.signUp(e)} >
					<input required ref={(input) => this.email = input} type="text" placeholder="Enter an email" />
					<input required ref={(input) => this.pass = input} type="password" placeholder="Enter a pass" />
					<button type="submit">SIGN ME UP</button>
				</form>
			</div>
		)
	}
}

export default Form;