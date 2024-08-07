import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function AppNav() {
  return (
    <Nav variant="pills" defaultActiveKey="/home" className="m-3 justify-content-center">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/workouts" exact="true">My Workouts</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AppNav;