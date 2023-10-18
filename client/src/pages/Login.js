import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";
import pg from "../assets/bg.webp";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handleLogin(e) {
        e.preventDefault();
        // login logic
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                // socket work
                socket.emit("new-user");
                // navigate to the chat
                navigate("/chat");
            }
        });
    }

    return (
         <div className="aaa">
<Container style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
  <Row style={{ width: "100%", maxWidth: 500 }}>
    <div style={{ border: "2px solid white", borderRadius: "10px", padding: "20px", width: "100%", background: "purple" }}>
      <h1 style={{ textAlign: "center" , color: "white" }}>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && <p className="alert alert-danger">{error.data}</p>}
          <Form.Label className="aa">Email </Form.Label>
          <Form.Control
    type="email"
    placeholder="Enter email"
    onChange={(e) => setEmail(e.target.value)}
    value={email}
    required
    style={{
        backgroundColor: "white",
        color: "black",
        border: "2px solid purple",
        borderRadius: "10px",
        '::placeholder': { color: 'violet' }
    }}
/>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="aa">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required style={{
        backgroundColor: "white",
        color: "black",
        border: "2px solid purple",
        borderRadius: "10px",
        '::placeholder': { color: 'violet' }
    }}/>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            {isLoading ? <Spinner animation="grow" /> : "Login"}
          </Button>
        </div>

        <div className="py-4">
          <p className="text-center">
            Don't have an account ? <Link to="/register">Signup</Link>
          </p>
        </div>
      </Form>
    </div>
  </Row>
</Container>

</div>

    );
}

export default Login;
