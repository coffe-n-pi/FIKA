import React from "react";
import styled from "styled-components";
import LoginButton from "../../components/LoginButton/index.js";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
`;

const InputField = styled.input`
  display: block;
  border: 1px solid #eee;
  margin: 10px 0;
  background: white;
  padding: 5px;
`;

class LoginForm extends React.Component {
  render() {
    return (
    <Form>
      <h1>Login</h1>
      <InputField
        type="text"
        ref="username"
        placeholder="username"
        required
      />
      <InputField
        type="password"
        ref="password"
        placeholder="password"
        required
      />
      <LoginButton
        type="submit"
        value="Submit"
      />
    </Form>
    );
  }
}

export default LoginForm;
