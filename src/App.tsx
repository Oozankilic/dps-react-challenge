import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [nameFilter, setNameFilter] = useState('');

	  useEffect(() => {
		axios.get('https://dummyjson.com/users')
		  .then(response => {
			setUsers(response.data.users);
		  })
		  .catch(error => console.error('Error fetching data:', error));
	  }, []);

	  const handleNameFilter = (event) => {
		const { value } = event.target;
		setNameFilter(value);
		const lowercasedValue = value.toLowerCase();
		const filtered = users.filter(user => 
		  user.firstName.toLowerCase().includes(lowercasedValue) || 
		  user.lastName.toLowerCase().includes(lowercasedValue)
		);
		setFilteredUsers(filtered);
	  };

	return (
		<>
		<input
			type="text"
			placeholder="Search by name..."
			onChange={handleNameFilter}
		/>
		<ul>
		  {filteredUsers.map(user => (
			<li key={user.id}>
			  {user.firstName} {user.lastName} - {user.address.city}, {user.birthDate}
			</li>
		  ))}
		</ul>
		</>
	);
}

export default App;
