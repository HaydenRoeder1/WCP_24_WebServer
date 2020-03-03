import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TableEntry from './components/TableEntry'
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Header from './components/Header';
import NavBar from './components/NavBar';
import AccountView from './components/AccountView';
import UtilityInterface from './components/UtilityInterface';

const SERVER = "http://127.0.0.1:3001/"
class App extends Component {
  state = {
    loginLevel: -1
  }
  updateUserLevel = (level) => {
    this.setState({
      loginLevel: level
    });
  }
  render(){
    if(this.state.loginLevel == -2){//Display login/create interface
      return(
      <Router>
        <div className = "App">
          <Header/>
          <NavBar />
          <Route path = "/signup"><CreateAccount updateUserLevel = {this.updateUserLevel}/></Route>
          <Route path = "/login"><Login updateUserLevel = {this.updateUserLevel}/></Route>
          <Route path = "/accounts"><AccountView server = {SERVER}/></Route>
          
        </div>
      </Router>
      );
    }else if(this.state.loginLevel == 0){//Display Consumer Interface
      return(
        <Router>
          <div className = "App">
            <Header/>
            <p>Consumer Interface</p>
          </div>
        </Router>
      )
    }else if(this.state.loginLevel == 1 || -1){//Display Utility Interface
      return(
        <Router>
          <div className = "App">
            <Header/>
            <br/>
            <UtilityInterface server = {SERVER}/>
          </div>
        </Router>
      )
    }else{//Display Admin Interface
      return(
        <Router>
          <div className = "App">
            <Header/>
            <p>Admin Interface</p>
          </div>
        </Router>
      )
    }
    return(
      <div>Logged In</div>
    )
  }
}

export default App;
