import './App.css';
import UserForm from './components/registration/UserForm';
import DisplayUser from './components/registration/DisplayUser';
import ButtonDisplay from './components/button/ButtonDisplay';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Fragment } from 'react';

function App() {
	return (
		<Router>
			<div className="App">
				<Route
					exact
					path="/"
					render={() => (
						<div className="App-link">
							<Link to="/buttons">Buttons</Link>
							<br />
							<Link to="/form">Registration form</Link>
						</div>
					)}
				/>
				<Route path="/buttons" component={ButtonDisplay} />
				<Route path="/form" component={UserForm} />
				<Route path="/formDetails" component={DisplayUser} />
			</div>
		</Router>
	);
}

export default App;
