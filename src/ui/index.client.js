import './app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './views/App';
import configureStore from './store/configureStore'

ReactDOM.render(
	<Provider store={configureStore()}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
