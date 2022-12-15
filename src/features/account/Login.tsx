import { Button, Container, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "../../app/store/actions/auth.action";
import { isUserAuthenticatedSelector } from "../../app/store/selectors/auth.selector";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface LocationState {
  from: {
    pathname: string;
  };
}

function LoginPage() {
  const authenticated = useAppSelector(isUserAuthenticatedSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location?.state as LocationState) || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(login(data));
      toast.success("Login successful ");
      navigate(from ? from : "/");
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", { required: true })}
            type="Password"
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

export default LoginPage;
