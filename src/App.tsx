import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [nameFilter, setNameFilter] = useState('');

	const uniqueCities = [...new Set(users.map(user => user.address.city))];
	const [cityFilter, setCityFilter] = useState('');

	const [highlightOldest, setHighlightOldest] = useState(false);

	let debounceTimer;

	useEffect(() => {
	axios.get('https://dummyjson.com/users')
		.then(response => {
		setUsers(response.data.users);
		setFilteredUsers(response.data.users);
		})
		.catch(error => console.error('Error fetching data:', error));
	}, []);

	const handleNameFilter = (value) => {
		setNameFilter(value);
		const lowercasedValue = value.toLowerCase();
		const filtered = users.filter(user => 
		  user.firstName.toLowerCase().includes(lowercasedValue) || 
		  user.lastName.toLowerCase().includes(lowercasedValue)
		);
		setFilteredUsers(filtered);
	};

	const handleCityChange = (event) => {
		const { value } = event.target;
		setCityFilter(value);
		if(value == ""){
			setFilteredUsers(users);
			return;
		}else{
			const filtered = users.filter(user => user.address.city === value);
			setFilteredUsers(filtered);
		}
	};

	const getOldestUsers = (users) => {
		const oldestPerCity = new Map();
		users.forEach(user => {
			const city = user.address.city;
			if (!oldestPerCity.has(city) || new Date(user.birthDate) < new Date(oldestPerCity.get(city).birthDate)) {
			oldestPerCity.set(city, user);
			}
		});
		return oldestPerCity;
	};
	
	const oldestUsers = getOldestUsers(users);
	const isOldest = (user) => {
		return oldestUsers.get(user.address.city).id === user.id;
	};

	const handleDebouncedNameChange = (event) => {
		clearTimeout(debounceTimer);
		const value = event.target.value;
		debounceTimer = setTimeout(() => handleNameFilter(value), 1000);
	};

	return (
		<>
		<div className="filters-container">
			<input
				type="text"
				placeholder="Search by name..."
				onChange={handleDebouncedNameChange}
			/>
			<select onChange={handleCityChange} value={cityFilter}>
				<option value="">Select city</option>
				{uniqueCities.map(city => (
					<option key={city} value={city}>{city}</option>
				))}
			</select>	
			<label>
			Highlight oldest per city
				<input
					type="checkbox"
					checked={highlightOldest}
					onChange={e => setHighlightOldest(e.target.checked)}
				/>
			</label>
		 </div>
		 <table>
			<thead>
				<tr>
				<th>Name</th>
				<th>City</th>
				<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{filteredUsers.map(user => (
				<tr key={user.id} style={{ fontWeight: highlightOldest ? (isOldest(user) ? 'bold' : 'normal') : 'normal' }}>
					<td>{user.firstName} {user.lastName}</td>
					<td>{user.address.city}</td>
					<td>{user.birthDate}</td>
				</tr>
				))}
			</tbody>
		</table>
		</>
	);
}

export default App;
