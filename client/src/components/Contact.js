import React, { useState, useEffect } from 'react'

const Contact = () => {

 
    const [user, setUser] = useState({Name:"",Email:"",Phone:"", Message:""})
    const [confirmation , setConfirmation] = useState("")

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
            setUser({...data, "Name":data.Name,"Email":data.Email,"Phone":data.Phone })

        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     callContactPage()
    },[])

    const storeData =(e)=>{
        const name = e.target.name;
        const value= e.target.value;
        setConfirmation("")
        setUser({
            ...user, [name]:value
        })
    }


    const pushToBackend = async (e) =>{
        e.preventDefault()
        const response = await fetch("/contact",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Name:user.Name,
                Email:user.Email,
                Phone:user.Phone,
                Message:user.Message
            })
        })

        const data = await response.text()
        if(!data){
            console.log("message not sent")
        }
        else{
            console.log(data)
            console.log("message sent")
            setConfirmation("Message sent succesfully")
            setUser({...user, Message:""})
        }
    }

    return (
        <div>
            <div style={{margin:"5% 0"}}>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div  style={{boxShadow:"2px 2px 10px #699EEE", width:"20%", margin:"1% 1%", borderRadius:"4px", padding:"0% 0", display:"flex", justifyContent:"center", alignItems:"center"}}><div><i style={{fontSize:"200%", color:"#699EEE"}} class="phone icon"></i></div><div style={{marginLeft:"2%"}}><h1 style={{marginBottom:"0.5%", color:"#699EEE"}}>Phone</h1><p style={{color:"black", fontWeight:"700"}}>+06 652 998 5214</p></div></div>
                    <div  style={{boxShadow:"2px 2px 10px #699EEE", width:"20%", margin:"1% 1%", borderRadius:"4px", padding:"0% 0", display:"flex", justifyContent:"center", alignItems:"center"}}><div><i style={{fontSize:"200%", color:"#699EEE"}} class="globe icon"></i></div><div style={{marginLeft:"2%"}}><h1 style={{marginBottom:"0.5%", color:"#699EEE"}}>Email</h1><p style={{color:"black", fontWeight:"700"}}>HelloAshis@ecosys.com</p></div></div>
                    <div  style={{boxShadow:"2px 2px 10px #699EEE", width:"20%", margin:"1% 1%", borderRadius:"4px", padding:"0% 0", display:"flex", justifyContent:"center", alignItems:"center"}}><div><i style={{fontSize:"200%", color:"#699EEE"}} class="address card icon"></i></div><div style={{marginLeft:"2%"}}><h1 style={{marginBottom:"0.5%", color:"#699EEE"}}>Address</h1><p style={{color:"black", fontWeight:"700"}}>Unit-8,New Delhi</p></div></div>
                </div>
            </div>
            <div style={{width:"70%",height:"40vh", margin:"0 15% auto", boxShadow:"2px 2px 10px #699EEE",boxSizing:"border-box"}}>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div><input placeholder="Your Name" name="Name" onChange={storeData}  style={{margin:"10% 0", fontSize:"150%"}} value={user.Name} /></div>
                    <div><input placeholder="Phone No" name="Phone" onChange={storeData}  style={{margin:"10% 0", fontSize:"150%"}} value={user.Phone} /></div>
                    <div><input placeholder="Your Email" name="Email" onChange={storeData}  style={{margin:"10% 0", fontSize:"150%"}} value={user.Email} /></div>
                </div>
                <div>
                    <textarea placeholder="TYPE YOUR MESSAGE HERE ...." name="Message" onChange={storeData} value={user.Message} style={{width:'90%', height:"20vh"}}></textarea>
                </div>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div>
                      <button onClick= {pushToBackend} >Send Message</button>
                    </div>
                    <div>
                        <p style={{fontWeight:"500", color:"green"}}>{confirmation}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
