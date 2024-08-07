import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Card, CardBody, Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../hooks/UserContext';

function Register() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function registerUser(e) {
		e.preventDefault();

		fetch("https://fitnessappapi.onrender.com/users/register", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})

		})
			.then(res => res.json())
			.then(data => {
				if (data.message === "Registered Successfully") {
					setEmail("");
					setPassword("");

					Swal.fire({
						title: "Registration successful",
						icon: "success",
						text: "You are now registered."
					})
					// navigate("/login");
				} else if (data.message === "Email invalid") {
					Swal.fire({
						title: "Email is invalid",
						icon: "error",
						text: "Please enter a valid email"
					})
				} else if (data.message === "Password must be atleast 8 characters") {
					Swal.fire({
						title: "Password is invalid",
						icon: "error",
						text: "Password must be at least 8 characters"
					})
				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please Contact the administrator"
					})
				}
			})
	}

	return(
		<>
			<Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h1 className="text-center mb-4 fw-bold">Register</h1>
                    <Form onSubmit={registerUser} className="p-4 border rounded bg-light">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    		
		</>
	)
}

export default Register;