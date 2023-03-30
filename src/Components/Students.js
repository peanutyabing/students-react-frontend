import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import AddForm from "./AddForm.js";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [addFormShow, setAddFormShow] = useState(false);
  const [changeLog, setChangeLog] = useState([]);

  useEffect(() => {
    getStudents();
  }, [changeLog]);

  const getStudents = async () => {
    try {
      const studentsRes = await axios.get("http://localhost:3004");
      setStudents(studentsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderStudents = () => {
    if (!students) return;
    return students.map((student) => (
      <Row key={student.id}>
        <Col>{student.id}</Col>
        <Col>{student.first_name}</Col>
        <Col>{student.last_name}</Col>
        <Col>{student.mobile}</Col>
        <Col>{student.gender ? "Male" : "Female"}</Col>
        <Col>
          <ButtonGroup>
            <Button size="sm" variant="light">
              E
            </Button>
            <Button size="sm" variant="secondary">
              D
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    ));
  };

  const logChange = (change) => {
    setChangeLog((prevState) => [...prevState, change]);
  };

  return (
    <div className="App-header">
      <Container className="table">
        <Row key="table-header" className="table-header">
          <Col>Student ID</Col>
          <Col>First Name</Col>
          <Col>Last Name</Col>
          <Col>Mobile</Col>
          <Col>Gender</Col>
          <Col>Actions</Col>
        </Row>
        {renderStudents()}
      </Container>
      {addFormShow && (
        <AddForm
          add={logChange}
          hideAddForm={() => {
            setAddFormShow(false);
          }}
        />
      )}
      <div className="flex-container">
        <Button
          variant="outline-light"
          onClick={() => {
            setAddFormShow(true);
          }}
        >
          Add student
        </Button>
      </div>
    </div>
  );
}
