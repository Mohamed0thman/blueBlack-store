import React from "react";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { logout } from "../store/actions/auth.action";
import { useAppDispatch } from "../store/configureStore";

const UserNav = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function formatName(displayName: string) {
    const fullName = displayName.split(" ");
    var firstLatter = fullName[0][0];
    var lastLetter;

    if (fullName.length > 0) {
      lastLetter = fullName[fullName.length - 1][0];
    }
    console.log("full name", firstLatter, lastLetter);

    return firstLatter + " " + lastLetter;
  }
  return (
    <NavDropdown
      title={
        <div className="pull-left">
          {user?.photoURL ? (
            <img
              className="thumbnail-image"
              src={user?.photoURL}
              alt="user pic"
            />
          ) : null}

          {user?.displayName ? formatName(user.displayName) : ""}
        </div>
      }
      id="basic-nav-dropdown"
    >
      <LinkContainer to="/profile">
        <NavDropdown.Item>profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item
        as="button"
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
      >
        logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};
export default UserNav;
