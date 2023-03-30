import { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button, ButtonGroup } from "react-bootstrap";

export default function AddForm(props) {
  const blankForm = {
    first_name: "",
    last_name: "",
    mobile: "",
    gender: undefined,
  };
  const [row, setRow] = useState(blankForm);

  const handleChange = (e) => {
    let { name, value } = e.target;
    const rowToUpdate = { ...row };
    rowToUpdate[name] = value;
    setRow(rowToUpdate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRow = await axios.post("http://localhost:3004", row);
      console.log(newRow.data);
      props.add({ change: "add", content: row });
      props.hideAddForm();
      setRow(blankForm);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>New student:</Col>
        <Col>
          <Form.Control
            name="first_name"
            value={row.first_name}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            name="last_name"
            value={row.last_name}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            name="mobile"
            value={row.mobile}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Select name="gender" value={row.gender} onChange={handleChange}>
            <option></option>
            <option value={false}>Female</option>
            <option value={true}>Male</option>
          </Form.Select>
        </Col>
        <Col>
          <ButtonGroup>
            <Button variant="light" size="sm" type="submit">
              ✔
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                props.hideAddForm();
              }}
            >
              ✘
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  );
}
