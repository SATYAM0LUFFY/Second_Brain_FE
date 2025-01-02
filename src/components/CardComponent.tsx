import axios from "axios"
import mongoose from "mongoose"
import { backendURL } from "../config"


interface CardComponentProps{

    _id : mongoose.Types.ObjectId,
    link : string,
    type : string,
    title :string,                                 
    userId : mongoose.Types.ObjectId,
    time : string,
    tag : string,
    discription : string,
    show : string,
    setRefresh : (refresh :boolean)=> void ,
    refresh : boolean

}
  
  export function CardComponent( {_id , link , type , title ,  time , tag , discription , show , setRefresh ,refresh}: CardComponentProps) {
    
    const deleteOnClickHandler =async ()=>{
      const token  = localStorage.getItem("token")
      const res = await axios.delete(`${backendURL}/api/v1/delete` , {
        headers : {token : token },
        data : {contentId : _id.toString()}
      }
      )
      alert(`${res.data.message}  , Refersh`);
      if(refresh){
        setRefresh(false);
      }else {
        setRefresh(true)
      }
    }

    if(type == show || show == "All"){
      
      return (
        
        <div className="h-96 w-72 mx-2 rounded-lg bg-white">
    
           {/* Title Component */}
          <div className="flex gap-5   items-center justify-between rounded-lg h-14">
    
            <div className="flex gap-2">
              <div className="flex items-center">
                {(type == "Tweet") ?
                <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
              </svg> 
              : <svg className="h-5 w-5  ml-3 mt-0  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
                </svg> }
              
              </div>
              <div className="text-[22px] font-bold">{title}</div>
            </div>
            
            <div className="flex gap-1 mr-1">
              <a href={link} target="_blank">
                <div className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                  <svg className="h-5 w-5 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                  </svg>
                </div>
              </a>

              <div onClick={deleteOnClickHandler} className="h-8 w-8 cursor-pointer rounded-full hover:bg-slate-100 flex items-center justify-center">
                <svg className="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          </div>
    
          {/*Content*/}
          <div className=" flex justify-center">
          {(type == "Youtube") && <iframe className="h-36 w-64" width="560" height="315" src={link.replace(/watch\?v=/ , "embed/")} ></iframe>}
          {(type == "Tweet") &&  <div className="h-48 w-60 overflow-auto rounded-3xl  overflow-x-hidden "  ><blockquote  className="twitter-tweet"> <a href= {link.replace(/x.com/, "twitter.com")}></a> </blockquote></div> }
            </div>
          <div className=" px-4 py-3 w-full text-base  ">
          {discription}
        </div>
        <div className="flex flex-wrap mb-2 mx-4 gap-2 ">
        <div className="px-2 h-5 bg-[#E0E6FF] rounded-xl text-xs">
                {tag} 
          </div>
        </div>
        <div className="px-4 text-sm text-slate-800">
          {time}
        </div>
    
        </div>
      )
    }
    else {
      return (null)
    }
    
        
      
  }

