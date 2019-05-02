import React from "react";
import "../../components/css/Login.css";

const bcrypt = require('bcrypt');

class Login extends React.Component {
  render() {
    return (
      <div className="box-container">
        <LoginBox />
      </div>
    );
  }
}

class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following values:");
    console.log(this.state);
  }

  render() {
    return (
      <div className="inner-container">
        <div className="header">Login</div>

        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button type="button" className="login-btn" onClick={this.handleSubmit}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
