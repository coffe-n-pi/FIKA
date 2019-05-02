import React from "react";
import "../../components/css/Login.css";

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
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitLogin(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">Login</div>

        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="username" name="username" placeholder="Username" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>

        <button
          type="button"
          className="login-btn"
          onClick={this.submitLogin.bind(this)}
        >
          Login
        </button>
      </div>
    );
  }
}

export default Login;
