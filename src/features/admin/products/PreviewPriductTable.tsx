import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PreviewPriductTable = () => {
  return (
    <Container>
      <Link to="/dashboard/products/create">add-product</Link>
    </Container>
  );
};

export default PreviewPriductTable;
