import React, { useEffect, useState } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import VariantTable from "../../../app/components/VariantTable";
import { Subcategory } from "../../../app/models";
import { getOptions } from "../../../app/store/actions/options.action";
import { getProducts } from "../../../app/store/actions/product.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { selectCategories } from "../../../app/store/selectors/categories.selectors";
import { selectOptions } from "../../../app/store/selectors/options.seletcors";
import { selectedProduct } from "../../../app/store/selectors/product.selector";

const PreviewProductPage = () => {
  let { productName } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectedProduct(productName as string));
  const categories = useAppSelector(selectCategories);
  const options = useAppSelector(selectOptions);

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      toast.success("product updated successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "categoryName") {
        console.log("dasdsad");

        setSubcategories(
          categories[watch().categoryName as number].subcategories
        );
      } else if (name === "productImage") {
        const newUrl = URL.createObjectURL(value.productImage[0]);
        // setFilePreview(newUrl);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch()]);
  console.log(subcategories);

  useEffect(() => {
    dispatch(getOptions());
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Image src={product?.productImage} />
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label> Product Name </Form.Label>
              <Form.Control
                defaultValue={product?.productName}
                {...register("productName", { required: true })}
                type="text"
                placeholder="Enter Product Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label> Product Price </Form.Label>
              <Form.Control
                defaultValue={product?.ProductPrice}
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
                defaultValue={product?.discount}
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
                    value={product?.categoryName}
                    {...register("categoryName", { required: true })}
                    aria-label="Default select example"
                  >
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
                    value={product?.subcategoryName}
                    {...register("subcategoryName", { required: true })}
                    aria-label="Default select example"
                  >
                    {/* {subcategories.length
                      ? subcategories.map((subcategory, i) => (
                          <option key={i} value={subcategory.subcategoryName}>
                            {subcategory.subcategoryName}
                          </option>
                        ))
                      : null} */}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <hr />
      <VariantTable variants={product?.productVariant} options={options} />
    </Container>
  );
};

export default PreviewProductPage;
