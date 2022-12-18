import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Button, Table, Form } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createCategory,
  createSubcategory,
  deleteCtegory,
  deleteSubcategory,
  getCategories,
  updateSubcategory,
} from "../../../app/store/actions/categories.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { selectedCategory } from "../../../app/store/selectors/categories.selectors";

const Subcategories = () => {
  let { categoryName } = useParams();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<boolean>(false);

  const category = useAppSelector(selectedCategory(categoryName as string));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(
        createSubcategory({
          ...data,
          categoryId: category?.categoryId,
          categoryName: category?.categoryName,
        })
      );
      toast.success("subcategory created successful ");
    } catch (error) {
      error;
    }
  }

  async function handelOnDelete(id: string) {
    try {
      console.log("dsadsadsa");
      await dispatch(deleteSubcategory());
      toast.success("category deleted successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handelOnUpdate(data: FieldValues, id: string) {
    try {
      await dispatch(updateSubcategory({ ...data, id }));
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
          {category
            ? category?.subcategories.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.subcategoryName}</td>
                  <td>{item.subcategoryOrder}</td>
                  <td>
                    {edit ? <Button>Update</Button> : <Button>Edit</Button>}
                    <Button>Delete</Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default Subcategories;
