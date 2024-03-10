import React, {  useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function Myaccount() {

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
          console.log(res);
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


    useEffect(()=>{
      axios.get('http://localhost:3000/see')
      .then((response) => {
         console.log(response);
      }).catch((err) => console.log(err));
  },[]);


  console.log(phone);
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
        <div className="uploadimage hidden">
      <input type="file" name="image" onChange={handleFile}  />
        <button  onClick={handleUpload}>Upload image</button>
      </div>
        <div className="profile-img relative  overflow-hidden">
          <img
            className="rounded-full h-[12vh] w-[12vh] object-cover "
            src={`http://localhost:3000/images/`+image}
            alt=""
          />
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
          <Link to="/myaccount">Accounts</Link>{" "}
        </h1>
      </div>
    </div>
      
      <div className="right-dash bg-zinc-50 rounded-md w-full">
        <div className="head w-full text-center uppercase py-5 border-b-2 border-zinc-200">
          <h1 className="font-regular text-2xl">My account</h1>
        </div>
        <div className="accnt-details px-10 py-5 ">
          <h1 className="font-regular text-xl py-1  border-b-2 border-zinc-200 capitalize ">
            Account details
          </h1>
          <div className="flex py-2">
            <label htmlFor="" className="mr-5">
              Email :{" "}
            </label>
            <p>{email}</p>
          </div>
          <div className="flex items-center">
            <label htmlFor="" className="mr-5">
              Phone :{" "}
            </label>
            <p className="mr-2 p-1">+91</p>
            <input
              className="p-1  border rounded border-zinc-400"
              type="text"
              value={8310852112}
            />
          </div>
        </div>
        <div className="personal-details px-10 py-5 ">
          <h1 className="font-regular text-xl py-1  border-b-2 border-zinc-200 capitalize ">
            Personal details
          </h1>
          <div className="flex justify-between items-center pr-32">
            <div className="flex py-2">
              <label htmlFor="" className="mr-5">
                Name :{" "}
              </label>  
              <p>{name}</p>
            </div>
            <div className="flex items-center justify-center py-2">
              <label htmlFor="" className="mr-2">
                Gender :{" "}
              </label>
              <select name="" id="" className="p-1">
                <option value="">Male</option>
                <option value="">Female</option>
                <option value="">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
        <div className="accnt-details px-10 py-5 ">
          <h1 className="font-regular text-xl py-1  border-b-2 border-zinc-200 capitalize ">
            Location details
          </h1>
          <p className="py-1 text-sm font-thin text-zinc-500">
            Please share your current city for optimized experience
          </p>
          <div className="py-2 flex flex-col">
            <label htmlFor="" className="pb-2">
              Address :{" "}
            </label>
            <textarea
              name=""
              id=""
              className="p-2 max-w-[30vw] h-32 border-2 rounded"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myaccount;
