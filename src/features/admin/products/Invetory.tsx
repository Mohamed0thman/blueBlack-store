import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import ProductTable from "../../../app/components/ProductTable";
import { getProducts } from "../../../app/store/actions/product.action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { selectProducts } from "../../../app/store/selectors/product.selector";

function Invetory() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Descount</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length
            ? products.map((product, index) => (
                <ProductTable product={product} key={index} index={index} />
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
}

export default Invetory;
