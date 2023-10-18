import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";
import Picker from "react-emoji-picker";
import EmojiDictionary from "emoji-dictionary";



function MessageForm() {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const user = useSelector((state) => state.user);
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const messageEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    function handleShowEmojiPicker() {
        setShowEmojiPicker(!showEmojiPicker);
      }
      function handleEmojiSelect(emoji) {
        setMessage(message + emoji);
      }
    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }

    function handleEmojiClick(emoji) {
        setMessage(message + emoji);
    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    return (
<Container className="chat-container">
        
<div className="messages-container" style={{ margin: "0"  }}>

    <div className="messages-output" style={{ backgroundColor: "purple" }} >
        {user && !privateMemberMsg?._id && <div className="alert alert-info" style={{ backgroundColor: "white" , color:"purple", font: "bold 16px Arial" , align: "center"}} ></div>}
        {user && privateMemberMsg?._id && (
            <>
                <div className="alert alert-info conversation-info" style={{ backgroundColor: "white" , color:"purple", font: "bold 16px Arial" , align: "center"}}>
                    <div>
                        Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className="conversation-profile-pic" />
                    </div>
                </div>
            </>
        )}
        {!user && <div className="alert alert-danger">Please login</div>}

        {user &&
            messages.map(({ _id: date, messagesByDate }, idx) => (
                <div key={idx} >
                    <p className="alert alert-info text-center message-date-indicator" style={{backgroundColor: "white" ,color: "purple" }}>{date}</p>
                    {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                        <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx} >

                            <div className="message-inner" style={{backgroundColor: "white" ,color: "black" }} >
                                <div className="d-flex align-items-center mb-3">
                                    <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                    <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                </div>
<p className="message-content">
  {content.split(/(:[a-zA-Z0-9-_+]+:)/).map((word, index) => {
    if (word.startsWith(':') && word.endsWith(':')) {
      const emojiChar = EmojiDictionary.getUnicode(word);
      if (emojiChar) {
        return <React.Fragment key={index}>{emojiChar}</React.Fragment>;
      }
    }
    return (
      <React.Fragment key={index}>
        {word}
      </React.Fragment>
    );
  })}
</p>

                                <p className="message-timestamp-left">{time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        <div ref={messageEndRef} />
        
    </div>
<Form onSubmit={handleSubmit} className="mt-0">
  <Row>
    <Col md={10}>
      <Form.Group>
        <Form.Control type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>

      </Form.Group>
    </Col>
    <Col md={2}>
    <div className="d-flex justify-content-between">
  <Button variant="primary" type="button" style={{ width: "48%", backgroundColor: "purple" }} disabled={!user} onClick={handleShowEmojiPicker}>
    <i className="fas fa-smile"></i>
  </Button>
  <Button variant="primary" type="submit" style={{ width: "48%", backgroundColor: "purple" }} disabled={!user}>
    <i className="fas fa-paper-plane"></i>
  </Button>
</div>

    </Col>
  </Row>
  {showEmojiPicker && (
    <Picker onSelect={handleEmojiSelect} />
  )}
</Form>
</div>

        
        </Container>
    );
}

export default MessageForm;
