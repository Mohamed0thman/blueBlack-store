import { Button, Container, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { register as regiserAction } from "../../app/store/actions/auth.action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { isUserAuthenticatedSelector } from "../../app/store/selectors/auth.selector";
function Register() {
  const authenticated = useAppSelector(isUserAuthenticatedSelector);

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
      await dispatch(regiserAction(data));
      toast.success("login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name", { required: true })}
            type="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button itemType="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
