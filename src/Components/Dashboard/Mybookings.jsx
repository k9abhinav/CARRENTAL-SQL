import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { FaCarOn } from "react-icons/fa6";
function Mybookings() {
  const [auth, setauth] = useState(false);
  const [message, setmessage] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [image, setimage] = useState();
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
          setname(res.data.userData.fullname);
          // console.log(res.data);
          setemail(res.data.userData.email);
          setimage(`http://localhost:3000/images/` + res.data.userData.image);
          setphone(res.data.userData.phno);
        } else {
          setauth(false);
          setmessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
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
  const [allordercar, setallordercar] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users_order")
      .then((res) => {
        if (res.data.Status === "Success") {
          setallordercar(res.data.userData);
          console.log("GOt all ordered CARS");
        } else {
          console.log("ERROR");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function formatDate(date) {
    let newdate = new Date(date);

    const day = String(newdate.getDate()).padStart(2, "0");
    const month = String(newdate.getMonth() + 1).padStart(2, "0");
    const year = newdate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  function formatTime(date) {
    let newdate = new Date(date);

    const hours = String(newdate.getHours()).padStart(2, "0");
    const minutes = String(newdate.getMinutes()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }

 

  const handleCancelOrder = (orderId) => {
    // Send a request to your backend to cancel the order
    axios
      .delete(`http://localhost:3000/cancel_orders/${orderId}`)
      .then((res) => {
        console.log("Server response:", res.data);
        console.log("Order cancelled successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error cancelling order:", err);
      });
  };

  const cancellationPolicy = (startdate) => {
    const presentDate = new Date();
    const bookingStartDate = new Date(startdate);
  
    const timeDifference = bookingStartDate.getTime() - presentDate.getTime();
  
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    return hoursDifference >= -6 && bookingStartDate > presentDate;
  };
  
  const feedbackShow = (endDateandTime) => {
    const endDate = new Date(endDateandTime);
    const presentDate = new Date();
    return endDate.getTime() > presentDate.getTime(); // Compare timestamps
};

const handleFeedback = (car_id) => {
  axios
  .post(`http://localhost:3000/review_o/${car_id}`)
  .then((res) => {
    console.log("Server response:", res.data);
    console.log("Order cancelled successfully");
  })
  .catch((err) => {
    console.error("Error cancelling order:", err);
  });
};

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
            /> EDIT
          </div>
          {auth ? (
            <div className="profile-name flex flex-col items-center py-4 ">
               <button
              className="profilepic rounded bg-slate-600 text-white font-semibold p-1"
              onClick={handleUpload}
            >
              Upload image
            </button>
              <h1 className="capitalize font-semibold ">{name}</h1>
              <h4 className="text-zinc-700 font-light text-xs">{phone}</h4>
              <h4 className="text-zinc-700 font-light text-xs">{email}</h4>
              <button onClick={handleLogout} className="px-2 py-1 font-semibold bg-red-300 rounded-md">Logout</button>
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

        <div className="main-book w-full flex gap-5 p-5 flex-col">
          {allordercar.map((bookedcar, index) => (
            <div key={index} className="allorders bg-zinc-200 p-5 rounded w-full">
             <div className="flex items-center w-full justify-evenly">
             <div className="text-xl font-semibold uppercase">
                <h1>Model :{bookedcar.model}</h1>
                <h1 className="text-blue-500">Car No :{bookedcar.cno}</h1>
              </div>
              <div className="car-img">
            <img src={`http://localhost:3000/images/`+bookedcar.car_image} alt="CARIMAGE" className="w-56 h-auto rounded-lg" />
              </div>
             </div>
              <div className="flex gap-4 w-full p-4 items-center">
                <h1>
                  From Date: {formatDate(bookedcar.s_date)} Time :{" "}
                  {formatTime(bookedcar.s_date)}
                </h1>
                <h1>
                  To Date: {formatDate(bookedcar.e_date)} Time :{" "}
                  {formatTime(bookedcar.e_date)}
                </h1>
                <h1>Order ID: {bookedcar.order_id} </h1>
                <h1>Color: {bookedcar.color} </h1>
                <h1>Capacity (seating) : {bookedcar.capacity} </h1>
                <h1>Type : {bookedcar.c_type}</h1>
                <h1>Category : {bookedcar.category_name}</h1>
                <h1>Pickup type :{bookedcar.d_type}</h1>
                
              </div>
              {cancellationPolicy(bookedcar.s_date) ? (
          <button
            className="cancelbtn p-2 rounded-md bg-red-500 text-white"
            onClick={() => handleCancelOrder(bookedcar.order_id)}
          >
            CANCEL ORDER
          </button>
        ) : (
          <div className="nocancel p-2">Cancellation not possible only possible 6 hours early</div>
        )}
<div className="feedbackbtn py-5">
  
{feedbackShow(bookedcar.e_date) === true ? (<button onClick={handleFeedback(bookedcar.order_id)} className="p-3 rounded-md bg-green-500 text-white">Review your experience </button>) : <div className="p-2 flex gap-5 items-center bg-green-100"><FaCarOn size={32} /> -----------ACTIVE BOOKING-----------</div> }
</div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mybookings;
