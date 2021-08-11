import React from 'react'
import './Home.css'
import homePic from '../assests/6461.jpg'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assests/logo.gif"

const Home  = () => {


    const [userName, setUserName] = useState("")
    const [flag, setFlag] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    const callContactPage = async()=>{
        try {
            const res = await fetch("/getdata",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })

        const data = await res.json()
        
        if(res.status!= 201)
        {
           console.log("we are sorry")
           console.log(data)
        }
        else{
            console.log(data)
            setUserName(data.Name)
            setFlag(true)
            setIsVisible(false)

        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     callContactPage()
    },[])

    return (
        <div className="main-container">
             <div className="left">
             <img width="100%" src ={homePic} alt="Home-image"/>
               
            </div>
             <div className="right" >
                 <div>
                 <h1 id="title">TECH<span id="span-design">BUSINESS SOLUTION</span></h1>
               <h1> Welcome  {flag? userName:" to social Development Application"}</h1>
               <div style={{display:"flex", justifyContent:'center', alignItems:"center"}}>
                   <div>
                   <img width="50%" src={logo} style={{marginLeft:"10%",visibility:isVisible?"collapse":"visible"}} />
                   </div>
               </div>
               <NavLink to="/signin">
                    <button className="action-btn" style={{visibility:isVisible?"visible":"hidden"}}>Login</button>
               </NavLink>
              
              <NavLink to="/signup">
                    <button className="action-btn" style={{visibility:isVisible?"visible":"hidden"}}>Register</button>
              </NavLink>
               
                 </div>
            </div>
        </div>
    )
}

export default Home 
