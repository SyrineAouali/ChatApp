import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import img from "../assets/img.jpg";
import pg from "../assets/bg.webp";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
            console.log("Max file size is 1mb")
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

   async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "h5hln8q9");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dm5qiw844/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
        const url = await uploadImage(image);
        console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });
    }

    return (
      <div
        className="mm"
        style={{
          backgroundImage: `url(${pg})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
 <div style={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
  <Container style={{ width: "80%" }}>
    <Form
      style={{
        width: "60%",
        maxWidth: 500,
        border: "2px solid white",
        padding: "20px",
        backgroundColor: "purple",
        borderRadius: "10px",
        margin: "0 auto",

      }}
      onSubmit={handleSignup}
    >
      <h1 className="text-center">Register Now!</h1>
      <div className="signup-profile-pic__container">
        <img src={imagePreview || img} className="signup-profile-pic" />
        <label htmlFor="image-upload" className="image-upload-label">
          <i className="fas fa-plus-circle add-picture-icon"></i>
        </label>
        <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
      </div>
      {error && <p className="alert alert-danger">{error.data}</p>}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="qq">Name</Form.Label>
        <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="qq">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="qq">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" type="submit">
          {upladingImg || isLoading ? "Signing you up..." : "Register"}
        </Button>
      </div>
      <div className="py-4">
        <p className="text-center">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </Form>
  </Container>
</div>

</div>
    );
}

export default Register;

