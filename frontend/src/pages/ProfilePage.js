import { useState, useEffect } from "react"
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { useProfileMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo.name, userInfo.email)

  useEffect(() => {
    if(userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler =(e) => {
    e.preventDefault();
    console.log("sH")
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' classname='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' classname='my-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='name' classname='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Name" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
        </Form>
      </Col>
      <Col md={9}></Col>

    </Row>
  )
}

export default ProfilePage