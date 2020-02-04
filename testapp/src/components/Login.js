import React, {Component} from 'react';

class Login extends Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = async (event) =>{
      event.preventDefault();
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;

      const data = {
        username: username,
        password: password
      }
      console.log(data);
      JSON.stringify(data);
      
      const api_call = await fetch('http://127.0.0.1:3001/login', {
        method: 'post', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch();
      const retData = await api_call.json();
      console.log(retData);
      this.props.updateData();
  }
  render(){
    return(
        <div className = "accountForm">
          <h1>Login</h1>
          <form onSubmit={this.onSubmit}>
              <label htmlFor="username">Enter username</label>
              <br/>
              <input id="username" name="username" type="text" />
              <br/>
              <label htmlFor="password">Enter your password</label>
              <br/>
              <input id="password" name="password" type="password" />
              <br/>
              <button>Login</button>
          </form>
        </div>
    );
  }
}

export default Login;