import EmployeesListItem from "../employees-list-item/employees-list-item";
import './emploees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp, onSalaryChange }) => {

	const elements = data.map(item => {
		const { id, ...itemProps } = item;
		return (
			<EmployeesListItem
				key={id}
				{...itemProps}
				onSalaryChange={(e) => onSalaryChange(id, parseInt(e.target.value.match(/\d+/)))}
				onDelete={() => onDelete(id)}
				onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))} />
		)
	})

	return (
		<ul className="app-list list-group">
			{elements}
		</ul>
	);
}

export default EmployeesList;