import React, {  useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function Mybookings() {
  const [auth, setauth] = useState(false);
  const [message, setmessage] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [image, setimage] = useState()
  axios.defaults.withCredentials = true;
  const [file, setfile] = useState();


  const handleFile = (e) => {
    setfile(e.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
   .post("http://localhost:3000/upload", formData)
   .then((res) => {
        console.log(res);
      })
   .catch((err) => {
        console.log(err);
      });
  };

 

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        if (res.data.Status === "Success") {
          setauth(true);
          // navigate('/login');
          setname(res.data.userData.fullname);
          console.log(res.data);
         
          setemail(res.data.userData.email);
          setimage(res.data.userData.image);
          setphone(res.data.userData.phno);
          
        } else {
          setauth(false);
          setmessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));

    });


  console.log(name);
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout")
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        setauth(false);
        setname("");
      })
      .catch((err) => console.log(err));
  };


  const handleEditClick = () => {
    document.querySelector('.uploadimage input[type="file"]').click();
  }
  
  return (
    <div className="dashboard bg-zinc-200 w-full min-h-screen px-10 py-5 flex gap-5">
      <div className="left-dash min-w-[18vw] bg-zinc-50 py-10 rounded-md">
      <div className="profile-detail flex flex-col items-center justify-center border-b-2 border-zinc-200 ">
        <div className="uploadimage">
      <input type="file" name="image" onChange={handleFile}  className="hidden" />
        <button  className="profilepic rounded bg-slate-100 p-1" onClick={handleUpload}>Upload image</button>
      </div>
        <div className="relative px-3">
        <div className="profile-img relative  overflow-hidden">
          <img
            className="rounded-full h-[12vh] w-[12vh] object-cover "
            src={`http://localhost:3000/images/`+image}
            alt=""
          />
        </div>
        <MdEdit className="absolute -right-1 bottom-0 w-6 h-6 rounded text-black cursor-pointer " onClick={handleEditClick} />

        </div>
        {auth ?  <div className="profile-name flex flex-col items-center py-4 ">
          <h1 className="capitalize font-semibold ">{name}</h1>
          <h4 className="text-zinc-700 font-light text-xs">{phone}</h4>
          <h4 className="text-zinc-700 font-light text-xs">{email}</h4>
          <button onClick={handleLogout}>Logout</button>
        </div> : (
        <h1 className="">
          {message} --Pehle Login kar ---
        </h1>
      )}
      
      </div>
      <div className="mybookings flex gap-3 items-center w-full py-5  px-10 border-b-2 border-zinc-200">
        <div className="w-3 h-3 bg-zinc-800 rounded-full"></div>
        <h1 className="capitalize">
          <Link to="/mybooking">My bookings</Link>
        </h1>
      </div>
      <div className="accounts flex gap-3 items-center w-full py-5  px-10 border-b-2 border-zinc-200">
        <div className="w-3 h-3 bg-zinc-800 rounded-full"></div>
        <h1 className="capitalize">
          {" "}
          <Link to="/myaccount">My Account</Link>{" "}
        </h1>
      </div>
    </div>
      
      <div className="right-dash bg-zinc-50 rounded-md w-full">
        <div className="head w-full text-center uppercase py-5 border-b-2 border-zinc-200">
          <h1 className="font-regular text-2xl">My bookings</h1>
        </div>
        
        
        
      </div>
    </div>
  );
}

export default Mybookings;
