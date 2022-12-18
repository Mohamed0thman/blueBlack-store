import React, { useEffect, useState } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [edit, setEdit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(createCategory(data));
      toast.success("category created successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handelOnDelete(id: string) {
    try {
      console.log("dsadsadsa");
      await dispatch(deleteCtegory(id));
      toast.success("category deleted successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handelOnUpdate(data: FieldValues, id: string) {
    try {
      await dispatch(updateCategory({ ...data, id }));
      setEdit(false);
      toast.success("category update successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

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
      <Form>
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {edit ? (
                        <Form.Control
                          {...register2("name")}
                          plaintext
                          type="text"
                          defaultValue={category.categoryName}
                        />
                      ) : (
                        <Link
                          to={`/dashboard/categories/${category.categoryName}`}
                        >
                          {category.categoryName}
                        </Link>
                      )}
                    </td>
                    <td>
                      <Form.Control
                        plaintext
                        readOnly={!edit}
                        {...register2("order")}
                        type="number"
                        defaultValue={category.categoryOrder}
                      />
                    </td>
                    <td>
                      {edit ? (
                        <Button
                          onClick={handleSubmit2((data) => {
                            handelOnUpdate(data, category.categoryId);
                          })}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setEdit(true);
                          }}
                        >
                          Edite
                        </Button>
                      )}
                      <Button
                        onClick={() => handelOnDelete(category.categoryId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Form>
    </Container>
  );
};

export default Categories;
