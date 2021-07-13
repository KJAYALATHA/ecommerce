import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({location,history}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const redirect = location.search ? location.serach.split('=')[1]:'/'
  console.log(redirect,"sowthri");

  const userLogin = useSelector(state => state.userLogin) //this userLogin is comes from store.js
  const {error,loading,userInfo} = userLogin

  useEffect(()=>{
      if(userInfo){
          history.push(redirect)
      }
  },[history,userInfo,redirect])



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
    console.log("submitted");
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant = 'danger'></Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter a email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer ?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
