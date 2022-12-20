import React, { useEffect, useState } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryTable from "../../../app/components/CategoryTable";
import {
  createCategory,
  deleteCtegory,
  getCategories,
  updateCategory,
} from "../../../app/store/actions/categories.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { selectCategories } from "../../../app/store/selectors/categories.selectors";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(createCategory(data));
      toast.success("category created successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length
            ? categories.map((category, index) => (
                <CategoryTable category={category} key={index} index={index} />
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default Categories;
