import './app-info.css';

const AppInfo = ({ totalNumber, totalIncrease }) => {
	return (
		<div className="app-info">
			<h1>Учет сотрудников в компании Evraz</h1>
			<h2>Общее число сотрудников: {totalNumber}</h2>
			<h2>Премию получат: {totalIncrease}</h2>
		</div>
	);
}

export default AppInfo;