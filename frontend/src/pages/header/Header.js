import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <Navbar bg={token ? "primary" : "dark"} data-bs-theme="dark">
        <Container>
          <Navbar.Brand>{token ? "LoggedIn" : "Not LoggedIn"}</Navbar.Brand>
          {token ? (
            <>
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/dashboard" className="nav-link">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link">
                  Signup
                </Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
