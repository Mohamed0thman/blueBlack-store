import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Subcategory, Option } from "../../../app/models";
import { getCategories } from "../../../app/store/actions/categories.action";
import { getOptions } from "../../../app/store/actions/options.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { selectCategories } from "../../../app/store/selectors/categories.selectors";
import { selectOptions } from "../../../app/store/selectors/options.seletcors";

const ProductForm = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [optionValue, setOptionValue] = useState<Option[]>([]);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const options = useAppSelector(selectOptions);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      // await dispatch(createCategory(data));
      toast.success("product created successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getOptions());
  }, []);

  useEffect(() => {
    if (watch().categoryName) {
      setSubcategories(
        categories[watch().categoryName as number].subcategories
      );
    } else {
      setSubcategories([]);
    }
  }, [watch().categoryName]);

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Product Name </Form.Label>
          <Form.Control
            {...register("productName", { required: true })}
            type="text"
            placeholder="Enter Product Name"
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicColorName">
              <Form.Label>Select Catgeory</Form.Label>

              <Form.Select
                {...register("categoryName", { required: true })}
                aria-label="Default select example"
              >
                <option defaultValue="" value="">
                  Open this select menu
                </option>
                {categories.length
                  ? categories.map((category, i) => (
                      <option key={category.categoryId} value={i}>
                        {category.categoryName}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicColorName">
              <Form.Label>Select Subcategory</Form.Label>

              <Form.Select
                {...register("subcategoryName", { required: true })}
                aria-label="Default select example"
                disabled={!subcategories.length}
              >
                <option>Open this select menu</option>
                {subcategories.length
                  ? subcategories.map((subcategory, i) => (
                      <option key={i} value={subcategory.subcategoryName}>
                        {subcategory.subcategoryName}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicColorName">
          <Form.Label>Select Colors</Form.Label>
          <Form.Select
            {...register("colors", { required: true })}
            aria-label="Default select example"
          >
            <option>Open this select menu</option>

            {options.length
              ? options.map((item) => {
                  if (item.type === "color") {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.name}
                      </option>
                    );
                  }
                })
              : null}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicColorName">
          <Form.Label>Select Sizes</Form.Label>
          <Form.Select
            {...register("sizes", { required: true })}
            aria-label="Default select example"
          >
            <option>Open this select menu</option>

            {options.length
              ? options.map((item) => {
                  if (item.type === "size") {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.name}
                      </option>
                    );
                  }
                })
              : null}
          </Form.Select>
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
};
export default ProductForm;
