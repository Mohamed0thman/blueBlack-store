import React, { useEffect } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createNewCategory,
  getCategories,
} from "../../../app/store/actions/categories.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(createNewCategory(data));
      toast.success("category created successful ");
    } catch (error) {
      console.log(error);
    }
  }

  console.log("categories", categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3" controlId="formBasicCategoryName">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter Category Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCategoryOrder">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("order", { required: true })}
            type="number"
            placeholder="order"
          />
        </Form.Group>

        <Button itemType="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {categories.length
            ? categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.categoryOrder}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default Categories;
