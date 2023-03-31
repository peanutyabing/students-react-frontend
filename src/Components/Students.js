import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import FormRow from "./FormRow.js";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [addFormShow, setAddFormShow] = useState(false);
  const [editFormShow, setEditFormShow] = useState(false);
  const [editingRowId, setEditingRowId] = useState(0);
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

  const handleEdit = async (e) => {
    setEditFormShow(true);
    setEditingRowId(parseInt(e.target.id));
  };

  const handleDelete = async (e) => {
    let message =
      "Are you sure you want to delete this row? All data on this student will be deleted.";
    if (window.confirm(message) === true) {
      try {
        const deleteRow = await axios.delete(
          `http://localhost:3004/id/${e.target.id}`
        );
        console.log(deleteRow.data);
        logChange({ change: "delete", content: `row with id ${e.target.id}` });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const renderStudents = () => {
    if (!students) return;
    const render = students.map((student) => {
      if (student.id === editingRowId && editFormShow) {
        return (
          <Row key={student.id}>
            <FormRow
              logChange={logChange}
              editing={true}
              id={student.id}
              firstName={student.first_name}
              lastName={student.last_name}
              mobile={student.mobile}
              gender={student.gender}
              hideFormRow={() => {
                setEditFormShow(false);
              }}
            />
          </Row>
        );
      } else {
        return (
          <Row key={student.id}>
            <Col>{student.id}</Col>
            <Col>{student.first_name}</Col>
            <Col>{student.last_name}</Col>
            <Col>{student.mobile}</Col>
            <Col>{student.gender ? "Male" : "Female"}</Col>
            <Col>
              <ButtonGroup>
                <Button
                  id={student.id}
                  size="sm"
                  variant="light"
                  onClick={handleEdit}
                >
                  E
                </Button>
                <Button
                  id={student.id}
                  size="sm"
                  variant="secondary"
                  onClick={handleDelete}
                >
                  D
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        );
      }
    });
    return render;
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
        <FormRow
          logChange={logChange}
          editing={false}
          hideFormRow={() => {
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
