import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/configureStore";

import { Option, ProductVariant } from "../models";
type Props = {
  index: number;
  options: Option[];
  variant: ProductVariant;
};

const VariantCell = ({ index, options, variant }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Form.Group className="mb-3" controlId="selectColor">
          <Form.Label>Select Colors</Form.Label>
          <Form.Select
            value={variant.color}
            aria-label="Default select example"
          >
            {options.length
              ? options.map((item, i) => {
                  if (item.type === "color") {
                    return (
                      <option key={item.id} value={i}>
                        {item.name}
                      </option>
                    );
                  }
                })
              : null}
          </Form.Select>
        </Form.Group>
      </td>
      <td>
        <Form.Group className="mb-3" controlId="selectColor">
          <Form.Label>Select Colors</Form.Label>
          <Form.Select value={variant.size} aria-label="Default select example">
            {options.length
              ? options.map((item, i) => {
                  if (item.type === "size") {
                    return (
                      <option key={item.id} value={i}>
                        {item.name}
                      </option>
                    );
                  }
                })
              : null}
          </Form.Select>
        </Form.Group>
      </td>
    </tr>
  );
};

export default VariantCell;
