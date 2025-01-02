import { SignUpInPage } from './pages/signUpInPage'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { Dashbord } from './pages/Dashbord'
import { Profile } from './pages/Profile'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        
          <Route path = "/signIn" element ={<SignUpInPage/>}/>
          <Route path ="/" element = {<Dashbord/>} />
          <Route path ="/dashboard" element = {<Dashbord/>} />
          <Route path='/share/:lastLink' element={<Dashbord/>}/>
          <Route path ="/profile" element={<Profile/>} />

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
