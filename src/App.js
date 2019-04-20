import React from 'react';
import Tagging from './modules/tagging';
import mainStyles from './styles/main.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>                
				<Tagging />               
			</div>
		)
	}
}
