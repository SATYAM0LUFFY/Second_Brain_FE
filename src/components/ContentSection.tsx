import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent"
import   axios           from "axios";
import { backendURL }    from "../config";
import { useParams }     from "react-router-dom";

interface contentSectionProps{
  show : string,
  refresh : boolean,
  setRefresh : (refresh : boolean)=>void 
}
const SecondContent = ()=>{

  const token = localStorage.getItem("token")
  return (
    <div className="text-slate-300 rounded-3xl bg-gray-100 w-full h-[480px] mr-6 flex justify-center items-center font-bold text-6xl">
    {!token ?  "Welcome! Signin to proceed." : `You Do Not Have Any Content`}
    </div>
  )
}


export const ContentSection = ({show , refresh , setRefresh} : contentSectionProps) => {

  const [userData , setUserData] = useState([]);    // all the variable used related to hook must be declared inside the componenet
  const token =  localStorage.getItem("token");
  const {lastLink} = useParams();   
  
  
  if(lastLink){
      useEffect(()=>{
        const callData = async()=>{
          const res = await  axios.get(`${backendURL}/api/v1/brain/${lastLink}`)
          setUserData(res.data.userContent);
          console.log(userData);
        }
        callData();
      },[refresh])
    }
  
else{  
  useEffect(()=>{
    const fetchData = async ()=>{

      const res  =await  axios.get(`${backendURL}/api/v1/content` , {
        headers : {
          token : token
        }
      })
      setUserData(res.data.userData) ;
    }

    fetchData();

  },[refresh])}

  return (
    <div className="pl-80 flex-wrap flex overscroll-none overflow-x-hidden w-screen gap-14"> 
         {(!userData || (userData.length == 0))  && <SecondContent/>} 
         {userData && userData.map(({_id , link , type ,title ,userId , time ,tag ,discription})=>(
          <CardComponent  _id  ={_id} link ={link}  type ={type} title = {title} userId = {userId} time = {time} tag = {tag} discription = {discription} show = {show} setRefresh={setRefresh} refresh={refresh} />
         ))} 
        
    </div>
  )
}
