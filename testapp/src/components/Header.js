import React from 'react'
import logo from './Graphics/WCPLogo.PNG'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const Header = (props) => {
	
	return (
            <div className = "header" style = {{backgroundColor: "#005a43"}}>
                  <img className = "logo" src = {logo} alt = "WCP 24"/>
            </div>
	)
}

export default Header;