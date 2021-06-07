import { useState } from 'react';
import './App.css';
import UserForm from './components/registration/UserForm';
import DisplayUser from './components/registration/DisplayUser';
import ButtonDisplay from './components/button/ButtonDisplay';

function App() {
	const [userData, setUserData] = useState(null);

	const getFormData = (data) => {
		setUserData(data);
	};

	return (
		<div className="App">
			<div>
				<ButtonDisplay />
			</div>
			<div>
				{!userData && <UserForm regData={getFormData} />}
				{userData && <DisplayUser userData={userData} />}
			</div>
		</div>
	);
}

export default App;
