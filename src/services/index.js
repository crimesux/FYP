import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/vote" activeStyle>
            Vote
          </NavLink>
          <NavLink to="/UserComponent" activeStyle>
            Campaign
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;