import React from 'react';

class LoginForm extends React.Component {
    render() { 
        return ( 
            <form>
                <h3>Login</h3>
                <input type="text" ref="username" placeholder="Enter Username" />
                <input type="password" ref="password" placeholder="Enter password" />
                <input type="submit" value="Login" />
            </form>
         );
    }
}
 
export default LoginForm;