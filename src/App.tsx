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
		<ul>
		  {users.map(user => (
			<li key={user.id}>
			  {user.firstName} {user.lastName} - {user.address.city}, {user.birthDate}
			</li>
		  ))}
		</ul>
		</>
	);
}

export default App;
