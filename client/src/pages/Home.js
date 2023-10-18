import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import logo from "../assets/logo.png";
import pg from "../assets/bg.webp";

function Home() {
  const [fondClass, setFondClass] = useState("fond-default");

  return (
    <div className="home">
      <Container className="home d-flex flex-column justify-content-center">
        <Row className="text-center">
          <Col>
            <div className={`fond ${fondClass}`}>
              <h1 className="mb-4 custom-title">Chat-App</h1>
              <LinkContainer to="/register">
                <Button variant="primary" size="lg" onClick={() => setFondClass("fond-blue")}>
                  Let's Talk! <i className="fas fa-comments home-message-icon"></i>
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;