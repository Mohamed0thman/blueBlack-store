import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "../../../app/store/actions/auth.action";
import { createNewColor } from "../../../app/store/actions/options.action";
import { useAppDispatch } from "../../../app/store/configureStore";

const Colors = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(createNewColor(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3" controlId="formBasicColorName">
          <Form.Label>Color Name</Form.Label>
          <Form.Control
            {...register("colorName", { required: true })}
            type="text"
            placeholder="Enter color name"
          />
        </Form.Group>
        <>
          <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
          <Form.Control
            {...register("colorValue", { required: true })}
            type="color"
            id="exampleColorInput"
            defaultValue="#563d7c"
            title="Choose your color"
          />
        </>
        <Button itemType="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Colors;
