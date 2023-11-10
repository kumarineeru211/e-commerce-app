import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../pages/Usercontext'
import axios from 'axios'

const Privateroute = () => {
    const [ok,setok]=useState(false);
    const [userauth,setuserauth]=useAuth();


    useEffect(()=>{
      const authcheck =async()=>{
        try {
          const res =await axios.get("http://localhost:8080/loginverify")
        if(res.data.ok){
            setok(true)
        }else{
            setok(false)
        }
        } catch (error) {
          console.error("Error in authcheck:", error.message);
        }
      }
      if(userauth?.token) authcheck();

    },[userauth?.token])



  return (
    <div>
        {
            ok ? <Outlet/> : "loading...."
        }
    </div>
  )
}

export default Privateroute