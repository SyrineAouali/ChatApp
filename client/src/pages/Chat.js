import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "./Chat.css";
function Chat() {
    return (
        <Container className="chat-container">
            <Row>
                <Col md={4}>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <Sidebar />
                    </div>
                </Col>
                <Col md={8}>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <MessageForm className="flex-grow-1" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Chat;
