
import axios from "axios";
import { useRef, useState } from "react";
import { backendURL } from "../config";

interface AddNoteModuleProps{
    setAdd : (add : boolean)=> void ;
    refresh : boolean , 
    setRefresh : (refresh : boolean) => void 
}

export const AddNoteModule = ({setAdd , refresh , setRefresh} : AddNoteModuleProps) => {

    const token = localStorage.getItem("token");
    const [clicked , setClicked] = useState(false);
    const onClickHandler =()=>{
        setAdd(false);
    }

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const tagRef = useRef<HTMLSelectElement>(null);

    const addButtonOnClickHandler = async ()=>{
        setClicked(true);

        const res = await axios.post(`${backendURL}/api/v1/content` , {
            link : linkRef.current?.value,
            title : titleRef.current?.value,
            type :typeRef.current?.value,
            tag : tagRef.current?.value,
            discription : descriptionRef.current?.value
        },{
            headers : {
                token : token
            }
        })

        if(res.data.status == 2){
            alert(res.data.message);
        }
        else {
            alert(`Content Saved `);
            setAdd(false);   
 
        }
        if(refresh){
            setRefresh(false);
        }else {
            setRefresh(true);
        }
        setClicked(false);
    }

  return (
    <div>
        <div onClick={onClickHandler} className="bg-slate-700 opacity-90 h-screen absolute w-screen left-0 top-0"></div>
      <div className=" rounded-xl h-[410px] w-[500px] px-5 bg-white absolute top-40 left-[450px]  ">
        {/*heading */}
        <div className="flex justify-between">
        <div className="flex  text-xl font-bold my-3">Add Note</div>
        <div  onClick={onClickHandler} className=" cursor-pointer hover:bg-slate-200 h-6 w-6 justify-center rounded-full flex items-center mt-4 ">
                    <svg className="h-3 w-3" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 490 490" >
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
                489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
        </div>
        </div>

        {/*content */}
        <div className=" justify-center  ">
        <div className="text-base font-medium text-slate-700">Enter Title *</div>
        <input ref={titleRef} type="text" placeholder="Title" className="border-2 w-full h-10 rounded-lg  shadow-md "/>
        <div className="text-base font-medium mt-3 text-slate-700">Paste Link*</div>
        <input ref={linkRef} type="text" placeholder="Link" className="border-2 w-full h-10 rounded-lg  shadow-md "/>
        <div className="text-base font-medium mt-3 text-slate-700">Give discription</div>
        <input ref={descriptionRef} type="text" placeholder="Discription" className="border-2 w-full h-10 rounded-lg  shadow-md "/>
        
        <div className="flex justify-around ml-0 pl-0  ">

        <label className="text-base font-medium text-slate-700 ">
            Select Type : 
        <select ref={typeRef} name="Type" className=" text-black  mt-5">
            <option value="Tweet">Tweet</option>
            <option value="Youtube">Youtube</option>
            <option value="Document">Document</option>
        </select>
        </label>

        <label className="text-base font-medium text-slate-700">
            Select Tag : 
        <select ref={tagRef} name="Tag" className=" text-black  mt-5">
            <option value="Politics">Politics</option>
            <option value="Productivity">Productivity</option>
            <option value="Entertainment">Entertainment</option>
        </select>
        </label>
        </div>

        {/*Button */}

        
        <button onClick={addButtonOnClickHandler} className="h-10 w-full justify-center flex mt-7 rounded-md bg-[#573FB4] items-center">
        {clicked && 
          <div className="animate-spin text-white h-6 w-6">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          </div>}
            {!clicked && <svg className={`h-5 w-5  text-white ${clicked && "blur-sm"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>}
            <div  className={`text-white font-semibold ${clicked && "blur-sm"} `}>
                Add Notes
            </div>
        </button>
        </div>
    </div>
    </div>

    
  )
}

