import React, { useContext } from 'react'
import './Navbar.css'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App'





 const Navbar = () => {
  
  
  const  DisplayLinks = ()=>{
    
    const {state, dispatch } = useContext(UserContext)
    
    if(state){
      return(
        <>
        <NavLink to="/">
  <a className="active item">
     Home
  </a>
  </NavLink>
  <NavLink to="/about">
  <a className="item">
     Profile
  </a>
  </NavLink>
  
  <NavLink to="/contact">
   <a className="item">
     Contact
   </a>
  </NavLink>
  <div className="right menu">
  <div className="item">
    <div className="ui icon input">
      <input type="text" placeholder="Search..."/>
      <i className="search link icon"></i>
    </div>
  </div>
  <NavLink to="/logout">
     <a className="ui item" style={{backgroundColor:'cyan', }}>
       Logout
     </a>
  </NavLink>
  
  
           </div>
           </>
      )
    }
    else{
      return(
        <>
        <NavLink to="/">
  <a className="active item">
     Home
  </a>
  </NavLink>
  <NavLink to="/about">
  <a className="item">
     About
  </a>
  </NavLink>
  
  <NavLink to="/signin">
  <a className="item">
    sign-in
  </a>
  </NavLink>
  
  <NavLink to="/signup">
   <a className="item">
     sign-up
   </a>
  </NavLink>
  
  <NavLink to="/contact">
   <a className="item">
     Contact
   </a>
  </NavLink>
  <div className="right menu">
  <div className="item">
    <div className="ui icon input">
      <input type="text" placeholder="Search..."/>
      <i className="search link icon"></i>
    </div>
  </div>
  
  
  
           </div>
        </>
      )
    }
  }
  

    return (
        <div className="nav-container">
             <div className="ui secondary  menu ">
    
               <DisplayLinks />
             
             </div>
        </div>
    )
}

export default Navbar