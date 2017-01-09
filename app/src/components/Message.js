import React from 'react';

const Message = (props) => {
	return(
		<li className="message">
			<img src={props.details.image} alt={"This is an image of " + props.details.user + " the great!"}/>
			<p>{props.details.message}</p>
		</li>
	)
}

export default Message;