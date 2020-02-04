import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TableEntry from './components/TableEntry'
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Header from './components/Header';
import NavBar from './components/NavBar';

const SERVER = "http://127.0.0.1:3001/"
class App extends Component {
  state = {
    users: [],
    loginLevel: -1
  }
  getName = async(e) => {
    console.log(SERVER + "data");
    const api_call = await fetch(SERVER+"data").catch()
    const data = await api_call.json();
    this.setState({
      users: data
    })
    console.log(this.state.users);
  }
  clearData = async (e) => {
    const api_call = await fetch(SERVER+"cleardata").catch()
    const data = await api_call.json();
    this.setState({
      users: data
    })
  }
  render(){
    if(this.state.loginLevel == -1){
      
      return(
      <Router>
        <div className = "App">
          <Header/>
          <NavBar />
          <Route path = "/signup"><CreateAccount updateData = {this.getName}/></Route>
          <Route path = "/login"><Login updateData = {this.getName}/></Route>
          <Route path = "/accounts">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((e, i) => {
                  return(<tr><td>{e.username}</td><td>{e.password}</td></tr>)
                })}
              </tbody>
            </table>
            <button onClick = {this.getName}>Update</button>
            <button onClick = {this.clearData}>Clear Data</button>
          </Route>
          
        </div>
      </Router>
      );
    }
    else{
      return(
        <div className = "App">
          <Header/>
          <NavBar />
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
}

export default App;
