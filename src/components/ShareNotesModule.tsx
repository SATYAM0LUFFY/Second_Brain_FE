import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL, frontendURL } from "../config";

interface ShareNotesModuleProps{
    setShowShare : (showShare : boolean) =>void ;
    
}

export const ShareNotesModule = ({setShowShare} : ShareNotesModuleProps ) => {
    const [share , setShare] = useState(true); 
    const [lastLink , setlastLink] = useState("");
    const [clicked , setClicked] = useState(false );
    const [refresh , setRefresh] = useState(false);

    useEffect(()=>{
        const shareCall = async ()=>{
            
            const token = localStorage.getItem("token"); 
            const res = await axios.get(`${backendURL}/api/v1/brain/share` , {
                headers :{
                    token : token
                }
            })
            setShare(res.data.share);
            if(share){
                setlastLink(res.data.lastLink);
            }
        }
        shareCall();
    },[refresh])

    const onClickHandler =()=>{
        setShowShare(false);
    }

    const stopSharingOnClickHandler= async ()=>{
        setClicked(true)
        const token  = localStorage.getItem("token");
        const res = await axios.post(`${backendURL}/api/v1/brain/share`,{
            share : "false"
        },{
            headers :{
                token : token
            }
        })
        if(res.data.status ==1){
            setClicked(false);
            alert(`Stopped Sharing`);
            setRefresh(x => !x);
        }
        
    }

    const generateLinkOnClickHandler = async ()=>{
        setClicked(true);
        const token = localStorage.getItem("token");
        const res =  await axios.post(`${backendURL}/api/v1/brain/share` ,
            { share : true},
            {
            headers :{token : token }
        })
        setShare(res.data.share)
        setlastLink(res.data.lastLink);
        setClicked(false);
        alert(`Link Generated`)
        setRefresh(x => !x);

    }

    const copyFunction =()=>{
        navigator.clipboard.writeText(`${frontendURL}/share/${lastLink}`);
        alert(`copied to clip board`)
    }

  return (
    <div>
        <div onClick={onClickHandler} className="bg-slate-700 opacity-90 h-screen absolute w-screen left-0 top-0"></div>
      <div className=" rounded-xl h-96 w-[520px] px-5  bg-white absolute top-40 left-[450px]  ">
        {/*heading */}
        <div className="flex justify-between">
        <div className="flex  text-xl font-bold my-3">Share Brain</div>
        <div  onClick={onClickHandler} className=" cursor-pointer hover:bg-slate-200 h-6 w-6 justify-center rounded-full flex items-center mt-4 ">
                    <svg className="h-3 w-3" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 490 490" >
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
                489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
        </div>
        </div>

        {/*content */}
        <div className=" justify-center text-base font-semibold text-slate-700">
            <div>
            <p>You can share your brain contents through a link . A link would be generated after you click 
                the generate link button . Anyone with the link can see all the contents present in your second brain. </p>
                <br />
            <p>You can stop sharing your Second Brain any time you want, previously generated link would no 
            longer be valid.</p>
            <br />
            <p>Only the owner can delete and add more contents , if you are signed in then also you will be able to add or delete content from your share link.</p>
            </div>
            

        {/*Button */}
        {share ?
        <div className="flex my-6 gap-6 justify-around ">
            <div className="h-10   flex">
                <div className="h-10  flex items-center rounded-md  border-2 border-slate-400 shadow-inner">{`${frontendURL}/share/${lastLink}`}</div>
                <div onClick={copyFunction} className="py-2 bg-[#E0E6FF] rounded-r-md hover:bg-slate-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                </div>
            </div>
            <button onClick={stopSharingOnClickHandler} className=" h-10 w-48  mr-0 flex gap-3 rounded-md bg-red-500
             items-center justify-center">
                {clicked && 
          <div className="animate-spin text-white h-6 w-6">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          </div>}
        {!clicked && <svg className="h-5 w-5 text-white hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>}
    <div className="text-white font-bold ">Stop Sharing</div> </button>
        </div>

        :<button onClick={generateLinkOnClickHandler} className=" h-10 w-full my-6 mr-0 flex gap-3 rounded-md bg-[#E0E6FF] items-center justify-center">
            {clicked && 
          <div className="animate-spin text-[#573FB4]  h-6 w-6">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          </div>}
        {!clicked &&  <svg className="h-5 w-5 text-[#573FB4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>}
    <div className={`text-[#573FB4] font-bold ${clicked && "blur-sm"}`} >Generate Link</div> </button> }
        
        </div>
    </div>
    </div>

    
  )
}


