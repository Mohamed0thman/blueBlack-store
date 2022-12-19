import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row, Image } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Subcategory } from "../../../app/models";
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
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState("");

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

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      if (name === "colors") {
        return setColors(
          (prevColors: string[]) => [...prevColors, value.colors] as string[]
        );
      } else if (name === "sizes") {
        return setSizes(
          (prevSizes: string[]) => [...prevSizes, value.sizes] as string[]
        );
      } else if (name === "categoryName") {
        setSubcategories(
          categories[watch().categoryName as number].subcategories
        );
      } else if (name === "productImage") {
        const newUrl = URL.createObjectURL(value.productImage[0]);
        setFilePreview(newUrl);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch()]);

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control
                {...register("productImage", { required: true })}
                type="file"
              />
            </Form.Group>
          </Col>
          <Col>
            <Image
              src={
                filePreview
                  ? filePreview
                  : "http://100dayscss.com/codepen/upload.svg"
              }
            />
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label> Product Name </Form.Label>
          <Form.Control
            {...register("productName", { required: true })}
            type="text"
            placeholder="Enter Product Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label> Product Price </Form.Label>
          <Form.Control
            min={0}
            step="50"
            {...register("price", { required: true })}
            type="number"
            placeholder="Enter Product Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label> Product Discount </Form.Label>
          <Form.Control
            {...register("discount", { required: true })}
            min={0}
            max={1}
            step=".05"
            type="number"
            placeholder="Enter Product Name"
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="selectCatgeory">
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
            <Form.Group className="mb-3" controlId="selectSubcategory">
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
        <Row className="">
          <Col>
            <Form.Group className="mb-3" controlId="selectColor">
              <Form.Label>Select Colors</Form.Label>
              <Form.Select
                {...register("colors", { required: true })}
                aria-label="Default select example"
              >
                <option defaultValue="" value="">
                  Open this select menu
                </option>

                {options.length
                  ? options.map((item, i) => {
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
          </Col>
          <Col className="d-flex">
            {colors.length
              ? colors.map((color, i) => (
                  <div
                    key={i}
                    style={{
                      background: color,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                    onClick={() =>
                      setColors((prevColors: string[]) =>
                        prevColors.filter((c) => c !== color)
                      )
                    }
                  ></div>
                ))
              : null}
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="selectSize">
              <Form.Label>Select Sizes</Form.Label>
              <Form.Select
                {...register("sizes", { required: true })}
                aria-label="Default select example"
              >
                <option defaultValue="" value="">
                  Open this select menu
                </option>

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
          </Col>
          <Col className="d-inline-flex">
            {sizes.length
              ? sizes.map((size, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "6px",
                      height: "40px",
                      marginRight: "7px",
                      border: "1px solid #eeee",
                    }}
                    onClick={() =>
                      setSizes((prevSizes: string[]) =>
                        prevSizes.filter((s) => s !== size)
                      )
                    }
                  >
                    {size}
                  </div>
                ))
              : null}
          </Col>
        </Row>

        <Button itemType="submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
export default ProductForm;
