import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateWorkout({workoutId}) {

    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
        
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

    
        fetch(`https://fitnessappapi.onrender.com/workouts/updateWorkout/${workoutId}`, {
          method: 'PATCH',
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
    
            if(data.message === 'Workout updated successfully') {
                Swal.fire({
                    title: 'Workout Updated!',
                    text: 'Your workout has been updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'Awesome!',
                  });
                closeEdit();
                navigate('/');

            } else {
                
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update workout. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                  });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update workout. Please try again.',
              icon: 'error',
              confirmButtonText: 'Okay',
            });
            console.error('There was a problem with the fetch operation:', error);
          });
      };
    return(
        <>
        <Button onClick={openEdit} className="m-2" variant='warning' size='md'>Update</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="WorkoutName">
                            <Form.Label>Workout Name</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="duration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
         


    )
}