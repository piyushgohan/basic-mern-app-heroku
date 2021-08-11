import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import signupPic from "../assests/register.jpg"
import { NavLink } from 'react-router-dom'

const Signup = () => {

    const history = useHistory()
    const [user, setUser] = useState({
        name:"",
        profession:"",
        phone:"",
        email:"",
        password:"",
        cpassword:""
    })

    let name, value;
    const storeData= (e)=>{
     name= e.target.name;
     value= e.target.value;

     setUser({
         ...user, [name]:value
     })
     
    }

    const postData = async(e)=>{
        try {
            console.log("post action called")
        console.log(user)
        e.preventDefault()
        
        const res = await fetch('/sign-up',{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Name:user.name,
                Proffesion:user.profession,
                Phone:user.phone,
                Email:user.email,
                Password:user.password,
                cPassword:user.cpassword
            })
        })

        history.push("/signin")
    
        const data = await res.json()
        console.log(data)
      
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div style={{ width:'100%', height:'100vh' ,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"60%", boxShadow:"2px 2px 10px black",borderRadius:'1%',display:'flex', padding:'2% 2%'}}>
                <div >
                    <h2>Sign Up</h2>
                    <form method="POST" >
                        <div class="ui left icon input" style={{margin:"2%"}}>
                            <input type="text" placeholder="Name" name="name" value={user.value} onChange={storeData}/>
                            <i class="user icon"></i>
                        </div>

                        <div class="ui left icon input" style={{margin:"2%"}}>
                            <input type="text" placeholder="Profession" name="profession" value={user.value} onChange={storeData}/>
                            <i class="briefcase icon"></i>
                        </div>

                        <div class="ui left icon input" style={{margin:"2%"}}>
                            <input type="text" placeholder="Phone" name="phone" value={user.value} onChange={storeData}/>
                            <i class="phone icon"></i>
                        </div>

                        <div class="ui left icon input" style={{margin:"2%"}}>
                            <input type="text" placeholder="Email" name="email" value={user.value} onChange={storeData}/>
                            <i class="at icon"></i>
                        </div>

                        <div class="ui left icon input" style={{margin:"2%"}}>
                            <input type="text" placeholder="Password" name="password" value={user.value} onChange={storeData}/>
                            <i class="pen square icon"></i>
                        </div>

                        <div class="ui left icon input" style={{margin:"2%"}}>
                            <input type="text" placeholder="Confirm Password" name="cpassword" value={user.value} onChange={storeData}/>
                            <i class="pencil alternate icon"></i>
                        </div>
                        <div>
                           <button type="submit" onClick={postData}>Register</button>
                        </div>
                        
                    </form>
                </div>
                
                <div style={{width:'80%'}} >
                    <img width="100%" height="80%" src={signupPic} />
                    <NavLink to="/signin">
                       <h3>Already a user? sign in</h3>
                    </NavLink>
                    
                </div>
            </div>
        </div>
    )
}

export default Signup
