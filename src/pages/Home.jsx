import AddWorkout from '../components/AddWorkout';
import AppNav from '../components/AppNav';

function Home() {
  return (
  	<>
    <div className='text-center'>
      <h1 className='fw-bold text-warning'>Let's Be Productive Today!</h1>
      <AddWorkout />
    </div>
  	</>
  );
}

export default Home;