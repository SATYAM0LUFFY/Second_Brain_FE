import { useNavigate } from "react-router-dom";


interface NavbarProps{
  setAdd : (add : boolean)=>void;
  setShowShare : (showShare : boolean) =>void ;
  show : string; 
}

export const Navbar = ({setAdd ,setShowShare, show} : NavbarProps) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const AddButtonOnClickHandler =()=>{
    if(!token){
      navigate("/signin")
    }else{
      setAdd(true);
    }
    
  }
  const shareButtonOnClickHandler =()=>{
    if(!token){
      navigate("/signin")
    }else{
      setShowShare(true);
    }
    
  }
  const signinOnClickHandler = ()=>{
    if(!token){ navigate("/signin")}
    else {
      navigate("/profile")
    }
  }

  return (
    <div className="pl-80   py-12 flex justify-between  h-36 w-screen">
      <div className="font-bold text-3xl">{(show == "All") && `All Notes`}{(show == "Youtube") && `All Vedios`}{(show == "Tweet") && `All Tweets`}{(show == "Document") && `All Documents`}</div>
      <div className="flex ">
        <button onClick={AddButtonOnClickHandler} className="h-10 w-40   justify-center flex gap-3 rounded-md bg-[#573FB4] items-center">
            <svg className="h-5 w-5  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <div  className="text-white font-semibold">
                Add Notes
            </div>
        </button>

        <button onClick={shareButtonOnClickHandler} className=" h-10 w-40 mx-4 mr-0 flex gap-3 rounded-md bg-[#E0E6FF] items-center justify-center">
            <svg className="h-5 w-5 text-[#573FB4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
        <div className="text-[#573FB4] font-bold ">Share Brain</div> </button>

        
        <button onClick={signinOnClickHandler} className=" h-10 w-40 mx-4 flex gap-3 rounded-md bg-[#E0E6FF] items-center justify-center">
            <svg className="h-5 w-5 text-[#573FB4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        <div className="text-[#573FB4] font-bold ">{token ? `Profile` : `Sign In`  } </div> </button>
      </div>
    </div>
  )
}


