import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `..?first_name=${firstName}&last_name=${lastName}&mobile=${mobile}&gender=${gender}`
    );
  };

  return (
    <Modal
      centered
      show={true}
      onHide={() => {
        navigate("/");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter students</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-container" controlId="first-name">
            <Form.Label>First name</Form.Label>
            <Form.Control
              className="filter-input"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-container" controlId="last-name">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              className="filter-input"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-container" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              className="filter-input"
              type="text"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-container" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              className="filter-input"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option></option>
              <option value={false}>Female</option>
              <option value={true}>Male</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="flex-container">
            <Button type="submit" variant="outline-dark">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
