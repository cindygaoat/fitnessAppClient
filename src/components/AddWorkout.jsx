import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddWorkout = () => {

    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = { name, duration };

    fetch('https://fitnessappapi.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 
        name: name,
        duration: duration }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {

        if(data.error === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save workout. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
              });
        } else {
            Swal.fire({
                title: 'Workout Added!',
                text: 'Your workout has been added successfully.',
                icon: 'success',
                confirmButtonText: 'Awesome!',
              });
            navigate('/workouts');
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add workout. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (

    <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h4 className="text-center mb-4 fw-bold">Add Workout</h4>
                    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                        <Form.Group controlId="name">
                            <Form.Label>Workout Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="e.g. Push Ups" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="duration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Duration" 
                                required
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    // <div className="container mt-4">
    //   <div className="card">
    //     <div className="card-body">
    //       <h2 className="card-title mb-4">Add New Workout</h2>
    //       <form onSubmit={handleSubmit}>
    //         <div className="form-group">
    //           <label htmlFor="name">Workout Name</label>
    //           <input
    //             id="name"
    //             type="text"
    //             className="form-control"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="description">Description</label>
    //           <textarea
    //             id="description"
    //             className="form-control"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <button type="submit" className="btn btn-primary mt-3">
    //           Add Workout
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AddWorkout;
