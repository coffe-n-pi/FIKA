import React from 'react';
import '../css/Login.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const Login = () => (
  <div className="box-container">
    <LoginBox />
  </div>
);

class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following values:');
    console.log(this.state);
  }

  render() {
    return (
<Grid
  container
  spacing={0}
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
  hellooo  
  </Grid>   

</Grid> 
        );
  }
}

  export default Login;
