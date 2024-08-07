import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../hooks/UserContext';
import WorkoutCard from '../components/WorkoutCard';

export default function Workouts() {

	const [workouts, setWorkouts] = useState([]);

    useEffect(() => {

        fetch('https://fitnessappapi.onrender.com/workouts/getMyWorkouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                if (typeof data.message !== "string") {
                    setWorkouts(data.workouts);
                } else {
                    setWorkouts([]);
                }

            });

    }, []);

	return(
		<>
			<div className='text-center m-5'>
                <h1 className='fw-bold mb-5'>My Workouts</h1>
                <Row className='justify-content-center'>
                    {
                        workouts.map(workout => {
                            return (
                                <Col md={3} key={workout._id}>
                                    <WorkoutCard workout={workout} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </>
	)
}