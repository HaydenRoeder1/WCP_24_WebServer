import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TableEntry from './components/TableEntry'
import CreateAccount from './components/CreateAccount';

class App extends Component {
  state = {
    users: []
  }
  getName = async(e) => {

    const api_call = await fetch('http://127.0.0.1:3001/data').catch()
    const data = await api_call.json();
    this.setState({
      users: data
    })
  }
  clearData = async (e) => {
    const api_call = await fetch('http://127.0.0.1:3001/clearData').catch()
    const data = await api_call.json();
    this.setState({
      users: data
    })
  }
  render(){
    return(
      <div className="App">
        <h1>WCP API Test</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((e, i) => {
              return(<tr><td>{e.Username}</td><td>{e.Password}</td></tr>)
            })}
          </tbody>
        </table>
        <button onClick = {this.getName}>Update</button>
        <button onClick = {this.clearData}>Clear Data</button>
        <div style = {{minHeight: '50px'}}/>
        <CreateAccount updateData = {this.getName}/>
      </div>
    );
  }
}

export default App;
