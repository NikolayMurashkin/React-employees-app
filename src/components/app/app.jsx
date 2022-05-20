import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import { Component } from "react";
import './app.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{ name: 'Иван Петров', salary: 800, increase: false, rise: false, id: 1 },
				{ name: 'Вероника Мурашкина', salary: 13200, increase: true, rise: true, id: 2 },
				{ name: 'Пётр Ефименко', salary: 2300, increase: false, rise: false, id: 3 },
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({ data }) => {
			return {
				data: data.filter(item => item.id !== id)
			}
		})
	}

	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			rise: false,
			id: this.maxId++
		}
		if (newItem.name.length > 3 && newItem.name !== '' && newItem.salary !== '') {
			this.setState(({ data }) => {
				const newArr = [...data, newItem];
				return {
					data: newArr
				}
			})
		}
	}

	onSalaryChange = (id, newSalary) => {
		this.setState(({ data }) => {
			return {
				data: data.map(item => {
					if (item.id === id) {
						console.log(newSalary)
						return { ...item, salary: newSalary }
					}
					return item
				})
			}
		})
	}

	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] }
				}
				return item;
			})
		}))
	}

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}
		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				return items.filter(item => item.rise)
			case 'salary':
				return items.filter(item => item.salary > 1000)
			default:
				return items;
		}
	}

	onUpdateSearch = (term) => {
		this.setState({ term });
	}

	onFilter = (filter) => {
		this.setState({ filter });
	}

	render() {
		const { data, term, filter } = this.state;
		const totalIncrease = data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className="app" >
				<AppInfo
					totalNumber={data.length}
					totalIncrease={totalIncrease} />

				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter onFilter={this.onFilter} data={data} />
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					onSalaryChange={this.onSalaryChange} />
				<EmployeesAddForm
					onAdd={this.addItem} />
			</div>
		);
	}
}

export default App;