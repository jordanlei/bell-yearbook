import Link from 'next/link'
import React, {Component} from 'react';
import ClassUsers from '../class-users';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  
const linkStyle = {
  marginRight: 15
}

class Header extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){

    var headerStyle={position: "fixed", 
    width: "100vw", 
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
    zIndex:"2"
  }

    var backgroundColor = "rgba(0, 0, 0, 0.5)"
    if(this.props.light)
    {
      headerStyle.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))"
      backgroundColor= "rgba(255, 255, 255, 0.5)"
    }

   

    return(
      <div style= {headerStyle}>
        <Navbar light= {this.props.light} dark= {!this.props.light} expand="md" style= {{paddingLeft: "3%", paddingRight: "3%"}}>
          <NavbarBrand href="/"><h4>&amp;</h4></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="/classof/2020"><p>2020</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="/classof/2021"><p>2021</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="/classof/2022"><p>2022</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="../about"><p>About</p></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
               <p><DropdownToggle nav caret style={{marginRight: "10px"}}>
                Users
                </DropdownToggle></p>
                <DropdownMenu className= "dropdown" right style= {{backgroundColor: backgroundColor, marginTop: "7px"}}>
                  <DropdownItem>
                    <NavLink href="../register">Create</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="../login">Login</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <style jsx>{`
        
        `}</style>
      </div>
    )
  }
}

export default Header