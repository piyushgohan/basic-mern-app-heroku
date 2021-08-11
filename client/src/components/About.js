import React, { useEffect, useState } from 'react'
import avatar from "../assests/avatar.png"
import { useHistory } from "react-router-dom"

const About = () => {

    const history = useHistory()
    const [user, setUser] = useState({})

    const callAboutPage = async()=>{
        try {
            const res = await fetch("/about",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })

        const data = await res.json()
        
        if(res.status != 201)
        {
          
           history.push("/signin")
        }
        else{
            console.log(data)
            setUser(data)

        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     callAboutPage()
    },[])

    return (
        <div style={{ height:"80vh" , display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
            <h1 style={{position:"absolute", top:"2%", left:"2%" }}>ABOUT</h1>
            <div style={{ width:"60%" ,display:"flex", justifyContent:"center", alignItems:"center", boxShadow:"2px 2px 10px black", borderRadius:"10px"}}>
                <div style={{margin:"5%"}}>
                    <img src={avatar} />
                </div>
                <div>
                    <div>
                        <h1 style={{marginBottom:"1%", textAlign:"left", fontSize:"400%", boxSizing:"border-box"}}>{user.Name}</h1>
                        <p style={{borderBottom:"3px solid black",textAlign:"left"}}>{user.Proffesion}</p>
                        <h2 style={{marginBottom:"0",textAlign:"left"}}>Email: {user.Email} </h2>
                        <h2 style={{marginTop:"0",textAlign:"left"}}>Phone: {user.Phone} </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
