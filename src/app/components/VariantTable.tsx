import React from "react";
import { Table } from "react-bootstrap";
import VariantCell from "./VariantCell";
import { Option, ProductVariant } from "../models";

type Props = {
  options: Option[];
  variants?: ProductVariant[];
};

const VariantTable = ({ options, variants }: Props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>color</th>
          <th>size</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {variants?.length
          ? variants.map((variant, index) => (
              <VariantCell
                variant={variant}
                options={options}
                index={index}
                key={index}
              />
            ))
          : null}
        {/* {products.length
          ? products.map((product, index) => (
              <ProductTable product={product} key={index} index={index} />
            ))
          : null} */}
      </tbody>
    </Table>
  );
};

export default VariantTable;
