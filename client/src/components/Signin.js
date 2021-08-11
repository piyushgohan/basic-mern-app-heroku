import React, { useContext, useState } from 'react'
import signinPic from '../assests/signin.jpg'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import  { UserContext } from '../App'

const Signin = () => {

    const {state , dispatch } = useContext(UserContext)

    const history = useHistory()
    
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")

    const pushToBackend = async(e) =>{
       try {
        console.log("Push funstion is working properly")
        e.preventDefault()
        const res = await fetch("/sign-in",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                Email:email,
                Password:password
            })
        })
        const data = await res.text()
        console.log(data)
        if(res.status===400)
        {
            window.alert("Invalid credentials")
        }
        else{
            dispatch({type:"USER" , payload:true})
            console.log(state)
            window.alert("Logged in successfully")
            history.push("/")
        }
           
       } catch (error) {
           console.log(error)
       }
    }

    return (
        <div style={{ width:"100%", height:"100vh"  ,display:'flex',justifyContent:"center", alignItems:"center"}}>
            <div style={{width:'50%', display:"flex", boxShadow:"2px 2px 10px black", borderRadius:"1%"}}>
                <div style={{display:'flex', justifyContent:"center", alignItems:"center", padding:"2%"}}>
                    <form>
                      
                        <h3>Sign In</h3>
                        <div class="ui left icon input" style={{margin:"2%"}}>
                             <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                             <i class="at icon"></i>
                             
                        </div>
                        <div class="ui left icon input" style={{margin:"2%"}}>
                             <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                             <i class="pencil alternate icon"></i>
                        </div>
                        <div>
                        <div class="ui animated button" onClick={pushToBackend} tabindex="0">
                           <div class="visible content" type="submit">Sign In</div>
                           <div class="hidden content">
                               <i class="right arrow icon"></i>
                           </div>
                        </div>
                        </div>
                        <h4>Forgot Password? try</h4>
                      
                    </form>
                </div>
                <div style={{width:"40%",padding:"2%"}}>
                    <img width="100%" src={signinPic}/>
                    <NavLink to="/signup">
                        <h3>Not a user? Sign Up</h3>
                    </NavLink>
                    
                </div>
            </div>
        </div>
    )
}

export default Signin
