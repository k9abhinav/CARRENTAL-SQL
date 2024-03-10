import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

function AdminAccount() {
  const [account,setAccount]=useState([])
  useEffect(() => {
    fetch("http://localhost:3000/user")
        .then(res => res.json())
        .then(data => setAccount(data))
        .catch(err => console.log(err))
  }, [])
  
    
  return (
    <div className="w-full bg-zinc-100 flex">
      <div className="left w-[20vw] h-screen bg-zinc-300 flex justify-center items-center">
        <div className="w-full h-[20vw] flex flex-col items-center justify-around">
          <Link to="/account">
            <button className="border-2 bg-zinc-100 w-20 p-2 rounded-md">
              Accounts
            </button>
          </Link>
          <Link to="/car">
            <button className="border-2 bg-zinc-100 w-20 p-2 rounded-md">
              Cars
            </button>
          </Link>
          <Link to="/orders">
            <button className="border-2 bg-zinc-100 w-20 p-2 rounded-md">
              Orders
            </button>
          </Link>
        </div>
      </div>

      <div className="right w-full bg-zinc-100 flex flex-col justify-around">
        <h1>User Account Details</h1>
        <div className="details bg-zinc-200 w-full h-[40vw] px-10 py-5">
          <div className="btns">
            <Link to="/account/add"><button className="border-[2px] bg-zinc-300 mr-5 p-2 rounded-md">Add</button></Link>
            <Link to="/account"><button className="border-[2px] bg-zinc-300 mr-5 p-2 rounded-md">View</button></Link>
          </div>
          <div className="tables items-center flex h-[20vw] mt-20">
            <table className="border-[1px] border-zinc-900 w-3/4 text-center bg-zinc-100">
              <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
              </thead>
              <tbody>
                {account.map((d, i) => (
                  <tr key={i}>
                    <td>{d.user_id}</td>
                    <td>{ d.username}</td>
                    <td>{d.email}</td>
                    <td>{d.phno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
