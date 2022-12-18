import React, { useEffect, useState } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import OptionsTable from "../../../app/components/OptionsTable";
import {
  createOption,
  getOptions,
} from "../../../app/store/actions/options.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { selectOptions } from "../../../app/store/selectors/options.seletcors";

const OptionsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState<string | null>(null);
  const options = useAppSelector(selectOptions);

  console.log("====================================");
  console.log("pageoptions", options);
  console.log("====================================");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(createOption(data));
    } catch (error) {
      error;
    }
  }

  function handelOnSelect(value: string) {
    setSelect(value);
  }

  useEffect(() => {
    dispatch(getOptions());
  }, []);
  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3" controlId="formBasicColorName">
          <Form.Label>Option Name</Form.Label>
          <Form.Control
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter color name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicColorName">
          <Form.Label>Option type</Form.Label>

          <Form.Select
            {...register("type", { required: true })}
            onChange={(e) => handelOnSelect(e.target.value)}
            aria-label="Default select example"
          >
            <option>Open this select menu</option>
            <option value="color">color</option>
            <option value="size">size</option>
          </Form.Select>
        </Form.Group>

        {select === "color" ? (
          <>
            <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
            <Form.Control
              {...register("value", { required: true })}
              type="color"
              id="exampleColorInput"
              defaultValue="#563d7c"
              title="Choose your color"
            />
          </>
        ) : (
          <Form.Group className="mb-3" controlId="formBasicColorName">
            <Form.Label>Option value</Form.Label>
            <Form.Control
              disabled={select !== "size"}
              {...register("value", { required: true })}
              type="text"
              placeholder="Enter option value"
            />
          </Form.Group>
        )}

        <Button itemType="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>value</th>
            <th>type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.length
            ? options?.map((option, index) => (
                <OptionsTable key={option.id} option={option} index={index} />
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default OptionsPage;
