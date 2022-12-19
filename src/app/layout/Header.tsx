import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import UserNav from "../components/UserNav.components";
import { useAppSelector } from "../store/configureStore";

function Header() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid="md">
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <Nav.Link>dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard/products">
              <Nav.Link>products</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!user ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>login</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                  <Nav.Link>register</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                {user?.roles?.some((s) => s === "admin") ? (
                  <NavDropdown title="create" id="basic-nav-dropdown">
                    <LinkContainer to="/dashboard/products/create">
                      <NavDropdown.Item>create product</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />

                    <LinkContainer to="/dashboard/categories">
                      <NavDropdown.Item>create category</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />

                    <LinkContainer to="/dashboard/options">
                      <NavDropdown.Item>create option</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : null}
                <UserNav user={user} />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
