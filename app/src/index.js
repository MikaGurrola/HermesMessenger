import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/App';
import ChatRoomPicker from './components/ChatRoomPicker';
import NotFound from './components/NotFound';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={ChatRoomPicker} />
				<Match exactly pattern="/room/:chatRoom" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render(<Root/>,document.querySelector('#main'));