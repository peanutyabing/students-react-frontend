import { useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";

export default function FormRow(props) {
  const defaultForm = {
    first_name: props.firstName ? props.firstName : "",
    last_name: props.lastName ? props.lastName : "",
    mobile: props.mobile ? props.mobile : "",
    gender: props.gender ? props.gender : false,
  };
  const [row, setRow] = useState(defaultForm);

  const handleChange = (e) => {
    let { name, value } = e.target;
    const rowToUpdate = { ...row };
    rowToUpdate[name] = value;
    setRow(rowToUpdate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.editing) {
      try {
        const updatedRow = await axios.put(
          `http://localhost:3004/id/${props.id}`,
          row
        );
        console.log(updatedRow.data);
        props.logChange({ change: "edit", content: row });
        props.hideFormRow();
        setRow(defaultForm);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        const newRow = await axios.post("http://localhost:3004", row);
        console.log(newRow.data);
        props.logChange({ change: "add", content: row });
        props.hideFormRow();
        setRow(defaultForm);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Container className="table">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col></Col>
          <Col>
            <Form.Control
              name="first_name"
              value={row.first_name}
              placeholder="First name"
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="last_name"
              value={row.last_name}
              placeholder="Last name"
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              name="mobile"
              value={row.mobile}
              placeholder="Mobile"
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              name="gender"
              value={row.gender}
              onChange={handleChange}
            >
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
                  props.hideFormRow();
                }}
              >
                ✘
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
