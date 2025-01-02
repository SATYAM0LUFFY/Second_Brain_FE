import { useEffect, useRef, useState } from "react"
import { backendURL } from "../config"
import axios from "axios"
import { token } from "../config"
import {  useNavigate } from "react-router-dom"

export const Profile = () => {

    const [userName , setUserName]  = useState("")
    const [email , setEmail] = useState("")
    const [share , setShare ] = useState(false);
    const [show , setShow ] = useState("G");
    const navigate = useNavigate();
    const [clicked , setClicked] = useState(false);

    const oldPassRef = useRef<HTMLInputElement>(null);
    const newPassRef = useRef<HTMLInputElement>(null);
    const newPassRef2 = useRef<HTMLInputElement>(null);
 
    useEffect(()=>{
        const callFunction = async ()=>{
            const res = await axios.get(`${backendURL}/api/v1/user` ,{
                headers : {
                    token : token
                }
            } )
            setUserName(res.data.userData.userName);
            setEmail(res.data.userData.email);

            const res2 = await axios.get(`${backendURL}/api/v1/brain/share`,{
                headers : {
                    token : token 
                }
            })
            setShare(res2.data.share)
        }
        callFunction();
    })


    const changePasswordOnClickHandler= async ()=>{
        setClicked(true);
        const oldPass  = oldPassRef.current?.value;
        const newPass = newPassRef.current?.value;
        const newPass2 = newPassRef2.current?.value;

        if(newPass == newPass2){
            const res = await axios.put(`${backendURL}/api/v1/change/password` , {

                    oldPassword : oldPass,
                    newPassword : newPass
            },{
                headers : {
                    token : token
                }
            })
            alert(res.data.message);
        }
        else{
            alert(`Enter New PassWord Correctly`)
        }
        setClicked(false);
        
    }

  return (
    <div className="h-screen w-screen relative ">
        <div onClick={()=>{navigate(`/dashboard`)}} className="flex gap-5 mb-8 cursor-pointer border-b-4 border-slate-300 h-20 items-center pb-6 px-44 ">
            <div className="mt-6 items-center"><svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 48 48" width="50px" height="50px"><path fill="#573FB4"  d="M11 5.34c-.12 1 .26.66-1 .66a7 7 0 0 0-5.15 11.75 7 7 0 0 0-2.23 10.73 12.14 12.14 0 0 0-2.56 8.74C1 46.59 12.33 51.56 19.31 45A11.66 11.66 0 0 0 23 36.51V6.22c0-7.79-11.14-8.36-12-.88zm-.55 40.55a8.89 8.89 0 0 1-4.78-2.18l.42-.42a2.1 2.1 0 0 1 2.42-.4 1 1 0 0 0 .9-1.78c-2-1-1.24.83-2-3.11-.61-3 1.55-4.14 0-4.89-1.79-.9-2.38 3.32-2 5.28.79 4 .85 1.7-1.19 3.94a10 10 0 0 1-.13-12.5c1.51 1 4.86 2 4.86.17a1 1 0 0 0-1-1c-5.79 0-6.94-8.33-1.27-9.82C8 19.87 11 20.73 11 19a1 1 0 0 0-1-1 5 5 0 1 1 1.44-9.77C13 12 18 13 18 11a1 1 0 0 0-1-1 4 4 0 1 1 4-3.78v9.37l-1.16 1.15a3.42 3.42 0 0 1-4.29.43 1 1 0 0 0-1.38.28c-1.12 1.68 3.7 3.68 6.83.92v18.14a9.3 9.3 0 0 1-10.51 9.38z"/><path fill="#573FB4" d="M16.21 23.79a3.14 3.14 0 0 0-4.42 0c-1 1-2-.42-3.08-1.5a1 1 0 0 0-1.42 1.42l.86.85-1.47.49A1 1 0 0 0 7.32 27l2.86-1c2.71.74 3.26-2.15 4.61-.79l2.5 2.5a1 1 0 0 0 1.42-1.42zM17 33h-1a3 3 0 0 0-3 3 1 1 0 0 1-1 1h-1a1 1 0 0 0 0 2h1a3 3 0 0 0 3-3 1 1 0 0 1 1-1h1a1 1 0 0 0 0-2zM45.36 28.49a7 7 0 0 0-2.21-10.74A7 7 0 0 0 38 6c-1.28 0-.93.35-1-.63A6 6 0 0 0 31 0a6.13 6.13 0 0 0-6 6.22v30.29C25 42.89 30.26 48.4 36.82 48a12 12 0 0 0 8.54-19.51zm-1.65 13.8A4.92 4.92 0 0 0 42 41c.55-2.79 1.21-4.79-.13-7.47a1 1 0 0 0-1.78.9c1 2.06.45 3.65-.07 6.25-3.33.28-1.92 2.85-.59 2.19s2.33.34 2.88.84A9.28 9.28 0 0 1 27 36.51V18.37c3.12 2.75 8 .76 6.83-.92a1 1 0 0 0-1.38-.28 3.42 3.42 0 0 1-4.29-.43L27 15.59V6.22A4 4 0 1 1 31 10a1 1 0 0 0-1 1c0 2.05 5.07 1 6.57-2.78A5 5 0 1 1 38 18a1 1 0 0 0 0 2 7 7 0 0 0 3.27-.82C47 20.68 45.73 29 40 29a1 1 0 0 0 0 2 6.89 6.89 0 0 0 3.86-1.17c4.76 6.02.14 12.72-.15 12.46z"/><path d="M41 27a1 1 0 0 0 .32-1.95l-1.47-.49.86-.85a1 1 0 0 0-1.42-1.42c-1.09 1.09-2.07 2.51-3.08 1.5a3.14 3.14 0 0 0-4.42 0l-2.5 2.5A1 1 0 0 0 30 28c.56 0 .54-.13 3.21-2.79 1.38-1.38 1.86 1.54 4.61.79 3.1 1 2.96 1 3.18 1zM37 37h-1a1 1 0 0 1-1-1 3 3 0 0 0-3-3h-1a1 1 0 0 0 0 2h1a1 1 0 0 1 1 1 3 3 0 0 0 3 3h1a1 1 0 0 0 0-2z"/></svg></div>
            <div className="mt-2 font-bold text-4xl ">Second Brain</div>
        </div>
        <div className="flex mx-44 pt-10 text-xl gap-16 border-b-2 border-slate-300 mr-96">
            <div onClick={()=>{setShow("G")}} className={`cursor-pointer h-10 transition-all ease-out duration-300 ${(show == "G") && "border-b-4 border-b-blue-600"}`} >General</div>
            <div onClick={()=>{setShow("S")}} className={`cursor-pointer h-10 transition-all ease-out duration-300 ${(show == "S") && "border-b-4 border-b-blue-600"}`} >Security</div>
        </div>
        {(show == "G") ? 
        <div className="mx-44 mt-10">
        <div> UserName : {userName}</div>
         <div>Email : {email}</div>
         <div>Sharing : {share ? `Yes` : `No`}</div>
     </div>
     : <div className="mx-44 mt-10 flex justify-center flex-col gap-8">
        <label htmlFor="">
        Enter Old Password 
       <div> <input ref={oldPassRef} type="text" className="border-2 border-slate-500" placeholder="input old password" /></div>
     </label>
     <label htmlFor="">
     Enter New Password 
     <div><input ref={newPassRef} type="text" className="border-2 border-slate-500" placeholder="input new password" /></div>
  </label>
  <label htmlFor="">
     Confirm  New Password 
     <div><input ref={newPassRef2} type="text" className="border-2 border-slate-500" placeholder="Input New Password " /></div>
  </label>
  <button onClick={changePasswordOnClickHandler} className={` h-10 w-40 bg-red-300 ${clicked && "blur-sm" }`} >
    Change Password
  </button>
     </div>
        }
    <button onClick={()=>{localStorage.removeItem("token"); navigate(`/signin`)}} className=" h-10 w-40 ml-44 absolute bottom-16  bg-red-300 ">
    Log Out 
  </button>
        
    </div>
    
  )
}


