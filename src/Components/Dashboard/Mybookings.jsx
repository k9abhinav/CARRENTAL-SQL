import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function Mybookings() {
  const [auth, setauth] = useState(false);
  const [message, setmessage] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [image, setimage] = useState();
  axios.defaults.withCredentials = true;
  const [file, setfile] = useState();
  // const [carNumber, setcarNumber] = useState('');
  // const [carmodel, setcarmodel] = useState("");
  // const [carcolor, setcarcolor] = useState("");
  // const [car_startdate, setcar_startdate] = useState("");
  // const [car_enddate, setcar_enddate] = useState("");
  // const [carcategory, setcarcategory] = useState("");
  // const [cartype, setcartype] = useState("");
  // const [carcapacity, setcarcapacity] = useState();
  // const [car_dtype, setcar_dtype] = useState('');
  // const [order_id, setorder_id] = useState()

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
          setimage(`http://localhost:3000/images/` + res.data.userData.image);
          setphone(res.data.userData.phno);
        } else {
          setauth(false);
          setmessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, [auth, email, phone, image]);

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
  };
const [allordercar, setallordercar] = useState([])
useEffect(() => {
  axios
  .get("http://localhost:3000/users_order")
  .then((res) => {
      if (res.data.Status === "Success") {
        setallordercar(res.data.userData)
        console.log(allordercar);
        // setcarNumber(res.data.userData.cno);
        // setcarcolor(res.data.userData.color);
        // setcar_enddate(res.data.userData.e_date);
        // setcar_startdate(res.data.userData.s_date);
        // setcarcapacity(res.data.userData.capacity);
        // setcarcategory(res.data.userData.category_name);
        // setcarmodel(res.data.userData.model);
        // setcartype(res.data.userData.c_type);
        // setcar_dtype(res.data.userData.d_type);
        // setorder_id(res.data.userData.order_id);
      } else {
        console.log("ERROR");
      }
    })
  .then((err) => console.log(err));
},[]);

// const startdate = new Date(car_startdate);
// const enddate = new Date(car_enddate);

// function formatDate(date) {
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); 
//   const year = date.getFullYear(); 

//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');

//   const formattedDate = `${day}-${month}-${year}`;
//   const formattedTime = `${hours}:${minutes}`;

//   return { date: formattedDate, time: formattedTime };
// }

// const formattedDateStart = formatDate(startdate);
// const formattedDateEnd = formatDate(enddate);

  return (
    <div className="dashboard bg-zinc-200 w-full min-h-screen px-10 py-5 flex gap-5">
      <div className="left-dash min-w-[18vw] bg-zinc-50 py-10 rounded-md">
        <div className="profile-detail flex flex-col items-center justify-center border-b-2 border-zinc-200 ">
          <div className="uploadimage">
            <input
              type="file"
              name="image"
              onChange={handleFile}
              className="hidden"
            />
            <button
              className="profilepic rounded bg-slate-100 p-1"
              onClick={handleUpload}
            >
              Upload image
            </button>
          </div>
          <div className="relative px-3">
            <div className="profile-img relative  overflow-hidden">
              <img
                className="rounded-full h-[12vh] w-[12vh] object-cover "
                src={image}
                alt=""
              />
            </div>
            <MdEdit
              className="absolute -right-1 bottom-0 w-6 h-6 rounded text-black cursor-pointer "
              onClick={handleEditClick}
            />
          </div>
          {auth ? (
            <div className="profile-name flex flex-col items-center py-4 ">
              <h1 className="capitalize font-semibold ">{name}</h1>
              <h4 className="text-zinc-700 font-light text-xs">{phone}</h4>
              <h4 className="text-zinc-700 font-light text-xs">{email}</h4>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <h1 className="">{message} --Pehle Login kar ---</h1>
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

        <div className="main-book w-full flex  p-5 flex-col">
          {allordercar.map((bookedcar,index)=>(
            <div key={index} className="allorders bg-slate-600">
            <div className="w-full text-xl">
              <h1>Model :{bookedcar.model}</h1>
              <h1>Car No :{bookedcar.cno}</h1>
            </div>
            <div className="flex gap-4 w-full p-4 items-center">
              {/* <h1>From Date: {formattedDateStart.date} Time : {formattedDateStart.time}</h1>
              <h1>To Date: {formattedDateEnd.date} Time : {formattedDateEnd.time}</h1> */}
              <h1>Order ID: {bookedcar.order_id} </h1>
              <h1>Color: {bookedcar.color} </h1>
              <h1>Capacity (seating) : {bookedcar.capacity} </h1>
              <h1>Type : {bookedcar.c_type}</h1>
              <h1>Category : {bookedcar.category_name}</h1>
              <h1>Pickup type :{bookedcar.d_type}</h1>
              <button className="cancelbtn p-2 rounded-md bg-red-500 text-white">
                CANCEL
              </button>
              <button className="cancelbtn p-2 rounded-md bg-green-500 text-white">
                Edit
              </button>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mybookings;
