import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
const Dashboard = () => {
  const token = localStorage.getItem("authToken");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        setUsers(result);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchUsers();
    else navigate("/login");
    console.log("users", users);
  }, [token, navigate]);
  console.log("users", users);
  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Name</th> <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
