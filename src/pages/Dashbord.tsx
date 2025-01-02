import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { ContentSection } from "../components/ContentSection"
import { useState } from "react"
import { AddNoteModule } from "../components/AddNoteModule"
import { ShareNotesModule } from "../components/ShareNotesModule"


export const Dashbord = () => {
  const [add , setAdd] = useState(false);
  const [showShare , setShowShare] = useState(false);
  const [show , setShow] =useState("All"); 
  const [refresh , setRefresh] = useState(false);

  
  
  return (
    <div className="flex  bg-[#F9FBFC] h-screen">
        <div className="flex flex-col">
        <Navbar setAdd = {setAdd} setShowShare = {setShowShare} show ={show} />
        <ContentSection show ={show} refresh ={refresh} setRefresh={setRefresh} />
        </div>
      <Sidebar setShow  = {setShow}/>
      {add ? <AddNoteModule setAdd = {setAdd} refresh ={refresh} setRefresh={setRefresh} /> : null}
      {showShare ? <ShareNotesModule setShowShare = {setShowShare}/> : null }
      
    </div>
  )
}


