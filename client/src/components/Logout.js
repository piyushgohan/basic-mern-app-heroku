import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'



const Logout = () => {

    const { state, dispatch } = useContext(UserContext)

    const history = useHistory() 
    const callLogoutPage = async()=>{
        try {
            const res = await fetch("/logout",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })

        const data = await res.text()
        
        if(res.status == 200)
        {
            dispatch({type:"USER" , payload:false})
            console.log(state)
           history.push("/signin")
        }
        else{
            throw new Error('Kuch toh gadbad hai daya')
        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     callLogoutPage()
    })
    return (
        <>
            
        </>
    )
}

export default Logout
