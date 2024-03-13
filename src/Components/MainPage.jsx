import React from 'react'
import { Link } from "react-router-dom";
function MainPage() {
  return (
    <div className='w-full bg-zinc-100 flex'>
    <div className="left w-[20vw] h-screen bg-zinc-300 flex justify-center items-center">
      <div className="w-full h-[20vw] flex flex-col items-center justify-around">
      
        <Link to="/account"><button className='border-2 bg-zinc-100 w-20 p-2 rounded-md'>Accounts</button></Link>
        <Link to="/car"><button className='border-2 bg-zinc-100 w-20 p-2 rounded-md'>Cars</button></Link>
        <Link to="/orders"><button className='border-2 bg-zinc-100 w-20 p-2 rounded-md'>Orders</button></Link>
        
      </div>
    </div>

    <div className="right w-full bg-zinc-100">
      
    </div>
      
  </div>
  )
}

export default MainPage