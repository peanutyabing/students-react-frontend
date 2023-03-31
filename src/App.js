import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Students</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
