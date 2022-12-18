import React, { useState } from "react";
import { Button } from "react-bootstrap";
type Props = {
  handelOnUpdate: any;
  handelOnDelete: any;
  handelOnEdit: React.MouseEventHandler<HTMLButtonElement>;
  edit: boolean;
};
const ActionsCell = ({
  handelOnUpdate,
  handelOnDelete,
  handelOnEdit,
  edit,
}: Props) => {
  return (
    <td>
      {edit ? (
        <Button onClick={handelOnUpdate}>Update</Button>
      ) : (
        <Button onClick={handelOnEdit}>Edit</Button>
      )}
      <Button onClick={handelOnDelete}>Delete</Button>
    </td>
  );
};

export default ActionsCell;
