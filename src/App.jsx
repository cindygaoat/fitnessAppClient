// import React, { useState, useEffect } from 'react'
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { UserProvider } from './hooks/UserContext';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Workouts from './pages/Workouts';

// function App() {

// 	const token = localStorage.getItem('token');

// 	const [user, setUser] = useState({
// 	id: null,
// 	isAdmin: null
// 	});

// 	function unsetUser() {
// 		localStorage.clear();
// 	};

// 	useEffect(() => {
// 		console.log("fetching url from App.jsx");
// 		fetch('http://localhost:4000/users/details', {
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem('token')}`
// 			}
// 		})
// 			.then(res => res.json())
// 			.then(data => {
// 				if (typeof data !== undefined) {
// 					setUser({
// 						id: data.user._id,
// 						isAdmin: data.user.isAdmin
// 					});
// 					console.log("user: ", user)
// 				} else {
// 					setUser({
// 						id: null,
// 						isAdmin: null
// 					});
// 				}
// 			})
// 	}, [token])

// 	return (
// 		<>
// 			<UserProvider value={{ user, setUser, unsetUser }}>
// 				<Router>
// 					<Routes>
// 						<Route path="/" element={<Home />} />
// 						<Route path="/login" element={<Login />} />
// 						<Route path="/register" element={<Register />} />
// 						<Route path="/workouts" element={<Workouts />} />
// 					</Routes>
// 				</Router>
// 			 </UserProvider>
// 		</>
// 	)
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';
import AppNav from './components/AppNav';

const App = () => {
    return (
        <Router>
            <AppNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/workouts" element={<Workouts />} />
            </Routes>
        </Router>
    );
};

export default App;
