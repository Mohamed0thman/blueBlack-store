import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "../../../app/store/actions/auth.action";
import {
  createNewColor,
  createNewSize,
} from "../../../app/store/actions/options.action";
import { useAppDispatch } from "../../../app/store/configureStore";

const Sizes = () => {
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
      await dispatch(createNewSize(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3" controlId="formBasicSizeName">
          <Form.Label>Color Name</Form.Label>
          <Form.Control
            {...register("sizeName", { required: true })}
            type="text"
            placeholder="Enter size name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSizeValue">
          <Form.Label>Color Name</Form.Label>
          <Form.Control
            {...register("sizeValue", { required: true })}
            type="text"
            placeholder="Enter size value"
          />
        </Form.Group>
        <Button itemType="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Sizes;
