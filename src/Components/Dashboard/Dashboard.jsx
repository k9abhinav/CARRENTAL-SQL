import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { RiImageEditFill } from "react-icons/ri";
function Dashboard() {
  const [auth, setauth] = useState(false);
  const [message, setmessage] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState(false);
  const [getGender, setgetGender] = useState("");
  const [address, setaddress] = useState("");
  const [image, setimage] = useState();
  axios.defaults.withCredentials = true;
  const [file, setfile] = useState();
  const [updated, setupdated] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    gender: "",
    phno: "",
    address: "",
  });
  console.log(values);
  const handleUpdate = () => {
    axios
      .post("http://localhost:3000/update-account", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/dash");
          console.log("Updated account gender phno and address");
          setupdated(true);
        } else {
          setupdated(false);
          console.log(res.data.Error);
          console.log("Error updating maybe ");
          alert("Enter Phone Number");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleFile = (e) => {
    setfile(e.target.files[0]);
    handleUpload();
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:3000/upload", formData)
      .then((res) => {
        console.log(res);
        console.log("image uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  

  useEffect(() => {
    axios.defaults.withCredentials = true;
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
          if (res.data.userData.gender == null) {
            setgender(false);
          } else {
            setgender(true);
            setgetGender(res.data.userData.gender);
            console.log(getGender);
          }
          setaddress(res.data.userData.address);
          console.log(gender);
        } else {
          setauth(false);
          setmessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  },[image, phone, auth, email, name,gender,address,getGender]);

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
                src={`http://localhost:3000/images/` + image}
                alt=""
              />
            </div>
            <MdEdit
              className="absolute -right-3 -bottom-5 p-2 rounded-full text-black bg-[#FAFAFA] m-4 cursor-pointer "
              size={38}
              onClick={handleEditClick}
            />{" "}
          </div>
          {auth ? (
            <div className="profile-name flex flex-col items-center py-4 ">
              <button
                className="profilepic rounded bg-slate-600 text-white font-semibold py-1 px-2 flex items-center gap-2"
                onClick={handleUpload}
              >
                Update profile picture <RiImageEditFill />
              </button>
              <h1 className="capitalize font-semibold ">{name}</h1>
              <h4 className="text-zinc-700 font-light text-xs">{phone}</h4>
              <h4 className="text-zinc-700 font-light text-xs">{email}</h4>
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
        <div className="logout flex items-center justify-center p-5">
          <button
            onClick={handleLogout}
            className="px-3 py-2 font-semibold bg-red-500 text-white  rounded-md"
          >
            Logout
          </button>
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
            <p>{phone}</p>
          </div>
          <div className="flex items-center">
            <label htmlFor="" className="mr-5">
              Change Phone :{" "}
            </label>
            <p className="mr-2 p-1">+91</p>
            <input
              className="p-1  border rounded border-zinc-400"
              type="text"
              pattern="[0-9]{10}" // Add your desired pattern here
              title="Please enter valid phone number"
              maxLength={10}
              onChange={(e) => {
                const newValue = e.target.value;
                setValues({ ...values, phno: newValue });
              }}
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
              <p>hello - {name}</p>
            </div>
            {gender ? (
              <div>Gender : {getGender}</div>
            ) : (
              <div className="flex items-center justify-center py-2">
                <label htmlFor="" className="mr-2">
                  Gender :{" "}
                </label>
                <select
                  name=""
                  id=""
                  className="p-1"
                  onChange={(e) => {
                    setValues({ ...values, gender: e.target.value });
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}
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
            <p>Present Address : {address}</p>
            <label htmlFor="" className="pb-2">
              Change Address :{" "}
            </label>
            <textarea
              name=""
              id=""
              className="p-2 max-w-[30vw] h-32 border-2 rounded"
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            ></textarea>
          </div>
          <div className="update-btns">
            <button
              className="bg-zinc-800 text-white px-4 py-2 rounded-md"
              onClick={handleUpdate}
            >
              Update
            </button>
            {updated && <h1>Updated account details successfully</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
