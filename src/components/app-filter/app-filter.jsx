import { Component } from 'react';
import './app-filter.css';

class AppFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: ''
		}
	}


	onFilter = (e) => {
		const filter = e.target.getAttribute('data-filter');
		const buttons = document.querySelectorAll('button');
		buttons.forEach(button => {
			button.classList.remove('btn-light');
			button.classList.add('btn-outline-light');
		})
		e.target.classList.remove('btn-outline-light');
		e.target.classList.add('btn-light');
		this.setState({ filter });
		this.props.onFilter(filter);
	}

	render() {
		const buttonsData = [
			{ 'data-filter': 'all', value: 'Все сотрудники', class: 'btn btn-light' },
			{ 'data-filter': 'rise', value: 'На повышение', class: 'btn btn-outline-light' },
			{ 'data-filter': 'salary', value: 'З/П больше $1000', class: 'btn btn-outline-light' },
		]

		const buttons = buttonsData.map(button => {
			return (
				<button data-filter={button['data-filter']}
					className={button.class}
					type='button'
					key={button['data-filter']}
					onClick={(e) => this.onFilter(e)} >
					{button.value}
				</button>

			)
		})
		return (
			<div className="btn-group" >
				{buttons}
			</div>
		);
	}
}

export default AppFilter;