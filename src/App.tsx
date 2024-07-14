import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);

	  useEffect(() => {
		axios.get('https://dummyjson.com/users')
		  .then(response => {
			setUsers(response.data.users);
		  })
		  .catch(error => console.error('Error fetching data:', error));
	  }, []);

	return (
		<>
			<div className="home-card">
				<p>Your solution goes here 😊</p>
			</div>
		</>
	);
}

export default App;
