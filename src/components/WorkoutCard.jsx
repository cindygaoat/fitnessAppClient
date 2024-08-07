import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../hooks/UserContext';
import Swal from 'sweetalert2';
import UpdateWorkout from './UpdateWorkout';

export default function WorkoutCard({ workout }) {

    const { _id, name, duration, status } = workout;

    const navigate = useNavigate();

    const handleStatus = () => {
        fetch(`https://fitnessappapi.onrender.com/workouts/completeWorkoutStatus/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if( data.message === 'Workout status updated successfully') {
                Swal.fire({
                    title: "Status Updated",
                    icon: "success",
                    text: "Workout Completed."
                })
            } else {
                Swal.fire({
                    title: "Error Updating Status",
                    icon: "error",
                    text: "Failed to update status."
                })
            }
        })
        .catch(error => console.error('Error patching data:', error));
    }

    const handleDelete = () => {
        fetch(`https://fitnessappapi.onrender.com/workouts/deleteWorkout/${_id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if( data.message === 'Workout deleted successfully') {
                Swal.fire({
                    title: "Workout Deleted",
                    icon: "success",
                    text: "Workout Deleted Successfully."
                })
                navigate('/')
            } else {
                Swal.fire({
                    title: "Error Deleting Workout",
                    icon: "error",
                    text: "Failed to delete workout."
                })
            }
        })
        .catch(error => console.error('Error patching data:', error));
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Duration:</Card.Subtitle>
                <Card.Text>{duration}</Card.Text>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>
                
                <Button onClick={handleStatus} className="m-2" variant='success' size='md'>Completed</Button>
                <UpdateWorkout workoutId={_id}/>
                <Button onClick={handleDelete} className="m-2" variant='danger' size='md'>Delete</Button>
                

            </Card.Body>
        </Card>
    )
}

// Check if the CourseCard component is getting the correct prop types (data types of the properties)
// PropTypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
// ProductCard.propTypes = {
//     // The "shape" method is used to check if a prop object conforms to a specific "shape"
//     courseProp: PropTypes.shape({
//         // Define the properties and their expected types
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired
//     })
// }