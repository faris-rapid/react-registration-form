import { useState } from 'react';
import './App.css';
import AddUserForm from './components/AddUserForm';
import DisplayUser from './components/DisplayUser';

function App() {
	const [userData, setUserData] = useState(null);

	const getFormData = (data) => {
		setUserData(data);
	};

	return (
		<div className="App">
			{userData === null && <AddUserForm regData={getFormData} />}
			{userData !== null && <DisplayUser userData={userData} />}
		</div>
	);
}

export default App;
