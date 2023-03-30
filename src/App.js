import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Students</Navbar.Brand>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link>Filter</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
