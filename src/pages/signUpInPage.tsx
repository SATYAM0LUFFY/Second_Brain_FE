import {  useState } from "react"
import { LeftSignInUp } from "../components/LeftSignInUp"
import { RightSignUp } from "../components/RightSignUp"
import { RightSignIn } from "../components/RightSignIn"


export const SignUpInPage = () => {

  const [signIn , setSignIn]   = useState(true);
  return (
    <div className="flex relative">
      
      <LeftSignInUp/>
      {signIn ? <RightSignIn   setSignIn = {setSignIn} /> :  <RightSignUp  setSignIn = {setSignIn}/> }
      
      
    </div>
  )
}


