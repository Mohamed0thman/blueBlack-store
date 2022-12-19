import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Category } from "../models";
import {
  deleteCtegory,
  updateCategory,
} from "../store/actions/categories.action";
import { useAppDispatch } from "../store/configureStore";

type Props = {
  category: Category;
  index: number;
};

const CategoryTable = ({ category, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  async function handelOnDelete(id: string) {
    try {
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
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {edit ? (
          <Form.Control
            {...register("name")}
            plaintext
            type="text"
            defaultValue={category.categoryName}
          />
        ) : (
          <Link to={`/dashboard/categories/${category.categoryName}`}>
            {category.categoryName}
          </Link>
        )}
      </td>
      <td>
        <Form.Control
          plaintext
          readOnly={!edit}
          {...register("order")}
          type="number"
          defaultValue={category.categoryOrder}
        />
      </td>
      <td>
        {edit ? (
          <Button
            onClick={handleSubmit((data) => {
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
        <Button onClick={() => handelOnDelete(category.categoryId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CategoryTable;
