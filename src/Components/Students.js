import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

export default function Students() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

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
        <Col>{student.first_name}</Col>
        <Col>{student.last_name}</Col>
        <Col>{student.mobile}</Col>
        <Col>{student.gender ? "Male" : "Female"}</Col>
        <Col>{student.id}</Col>
      </Row>
    ));
  };

  return (
    <Container>
      <Row key="table-header" className="table-header">
        <Col>First Name</Col>
        <Col>Last Name</Col>
        <Col>Mobile</Col>
        <Col>Gender</Col>
        <Col>Student ID</Col>
      </Row>
      {renderStudents()}
    </Container>
  );
}
