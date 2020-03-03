import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NavBar = (props) => {
      
	return (
            <div className = "navigation" style = {{backgroundColor: "#005a43"}}>
                  <Link to = "/signup">
                        <button className = "navbutton">
                              Create Account
                        </button>
                  </Link>
                  
                  <Link to = "login">
                        <button className = "navbutton">
                              Login
                        </button>
                  </Link>
                  <Link to = "accounts">
                        <button className = "navbutton">
                              View Accounts
                        </button>
                  </Link>
                  
            </div>
	)
}

export default NavBar;