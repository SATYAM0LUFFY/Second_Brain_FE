import { useRef, useState } from "react"
import { GoogleIcon } from "./icons/googleIcon"
import axios from "axios";
import { backendURL } from "../config";

interface RightSignUpProps{
  setSignIn : (signIn : boolean)=>void
}



export const RightSignUp = ({ setSignIn} : RightSignUpProps) => {

  const [error , setError] = useState("");
  const [clicked , setClicked] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function onClickHandler(){
    setSignIn(true)
  }

  const  SignUpOnClickHandler = async()=>{

    setClicked(true);

      const res = await axios.post(`${backendURL}/api/v1/signup`,{
        userName :usernameRef.current?.value,
        password : passwordRef.current?.value,
        email : emailRef.current?.value
      });

      if(res.data.status == 1){
        setError("");
        setSignIn(true);

      }
      else{
        setError(res.data.message)
      }
      setClicked(false);

  }

  return (
    <div className="mx-20 my-8  max-w-[630px] flex flex-col gap-9">
        <div className="text-[#573FB4] font-bold text-6xl text-center flex gap-5 justify-center ">
            SignUp
            <span><img className="h-5 w-5 cursor-pointer" src="src\assets\icons8-information-32.png" alt="" /></span>
        </div>

        <input ref={emailRef} type="text" placeholder="Enter Your Email" className="border-2 w-[400px] h-12 rounded-lg text-center shadow-md "/>
        <input ref={usernameRef} type="text" placeholder="Enter Your Username " className="border-2 max-w-[400px] h-12 rounded-lg text-center shadow-md"/>
        <input ref={passwordRef} type="text" placeholder="Enter Your Password " className="border-2 max-w-[400px] h-12 rounded-lg text-center shadow-md"/>

        <div className="flex flex-col">
        {error && <div className="px-0 mx-0 text-sm text-red-600 w-full text-center flex items-center justify-center ">{error}</div> }
        
        <button onClick={SignUpOnClickHandler} className={`flex justify-center items-center gap-3  border-2 w-[350px] h-12 rounded-lg text-center text-white  mt-5 bg-[#C75051] self-center font-medium text-lg  hover:w-[400px] hover:h-14 transition-all duration-300 ease-out`}> 
          
          {clicked && 
          <div className="animate-spin h-6 w-6">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          </div>}

          <div className={`${clicked && "blur-sm"} items-center`}>
            Sign Up
          </div>
          
          </button>
        
        <span className="mt-1 pt-0 text-center text-black cursor-pointer" onClick={onClickHandler}>Already Have An Account? SignIn</span>
        <div className="pt-5 self-center">------------------------------OR------------------------------</div>
        <div className="flex justify-center gap-16 mt-5">
          <GoogleIcon/>
          <div className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path d="M44,24c0,8.96-5.88,16.54-14,19.08V38c0-1.71-0.72-3.24-1.86-4.34c5.24-0.95,7.86-4,7.86-9.66c0-2.45-0.5-4.39-1.48-5.9 c0.44-1.71,0.7-4.14-0.52-6.1c-2.36,0-4.01,1.39-4.98,2.53C27.57,14.18,25.9,14,24,14c-1.8,0-3.46,0.2-4.94,0.61 C18.1,13.46,16.42,12,14,12c-1.42,2.28-0.84,4.74-0.3,6.12C12.62,19.63,12,21.57,12,24c0,5.66,2.62,8.71,7.86,9.66 c-0.67,0.65-1.19,1.44-1.51,2.34H16c-1.44,0-2-0.64-2.77-1.68c-0.77-1.04-1.6-1.74-2.59-2.03c-0.53-0.06-0.89,0.37-0.42,0.75 c1.57,1.13,1.68,2.98,2.31,4.19C13.1,38.32,14.28,39,15.61,39H18v4.08C9.88,40.54,4,32.96,4,24C4,12.95,12.95,4,24,4 S44,12.95,44,24z"/></svg>
          </div>
        </div>
        </div>
        
    </div>
  )
}

