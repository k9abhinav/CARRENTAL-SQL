import React from 'react'
import { Link } from "react-router-dom";

function AdminCar() {
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
        <h1>Car</h1>
        <div className="details bg-zinc-200 w-full h-[40vw] px-10 py-5">
          <div className="btns">
            <Link to="/addcar"><button className="border-[2px] bg-zinc-300 mr-5 p-2 rounded-md">Add</button></Link>
            <Link to="/car"><button className="border-[2px] bg-zinc-300 mr-5 p-2 rounded-md">View</button></Link>
          </div>
          <div className="tables items-center flex h-[20vw] mt-20">
            
              
          </div>
        </div>
    </div>
      
  </div>
  )
}

export default AdminCar