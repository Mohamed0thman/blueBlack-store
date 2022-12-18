import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Option } from "../models";
import ActionsCell from "./ActionsCell";
import { updateOption, deleteOption } from "../store/actions/options.action";
import { useAppDispatch } from "../store/configureStore";
import { toast } from "react-toastify";

type Props = {
  option: Option;
  index?: number;
};

const OptionsTable = ({ option, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [select, setSelect] = useState<string | null>();

  const dispatch = useAppDispatch();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  async function handelOnDelete(id: string) {
    try {
      console.log("dsadsadsa");
      await dispatch(deleteOption({ id }));
      toast.success("option deleted successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handelOnUpdate(data: any, id: string) {
    try {
      console.log("update");

      await dispatch(updateOption({ ...data, id }));
      setEdit(false);
      toast.success("option update successful ");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function handelOnEdit() {
    setEdit(true);
  }

  useEffect(() => {
    setSelect(option.type);
  }, [option.type]);

  return (
    <tr>
      {index && <td>{index + 1}</td>}
      <td>
        <Form.Control
          plaintext={!edit}
          readOnly={!edit}
          defaultValue={option.name}
          {...register2("name", { required: true })}
          type="text"
        />
      </td>
      <td>
        {select === "color" ? (
          <>
            <Form.Control
              plaintext={!edit}
              readOnly={!edit}
              {...register2("value", { required: true })}
              type="color"
              id="exampleColorInput"
              defaultValue={option.value}
            />
          </>
        ) : (
          <Form.Control
            plaintext={!edit}
            readOnly={!edit}
            defaultValue={option.value}
            {...register2("value", { required: true })}
            type="text"
          />
        )}
      </td>
      <td>
        <Form.Select
          disabled={!edit}
          defaultValue={option.type}
          {...register2("type", { required: true })}
          onChange={(e) => setSelect(e.target.value)}
          aria-label="Default select example"
        >
          <option value="color">color</option>
          <option value="size">size</option>
        </Form.Select>
      </td>
      <ActionsCell
        handelOnUpdate={handleSubmit2((data) => {
          handelOnUpdate(data, option.id);
        })}
        handelOnDelete={() => handelOnDelete(option.id)}
        handelOnEdit={handelOnEdit}
        edit={edit}
      />
    </tr>
  );
};

export default OptionsTable;
