import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function Leftdash() {
  const fileInputRef = useRef(null);
  const [file, setfile] = useState();
  const handleFileChange = (e) => {
    // setFile(e.target.files[0]);
    const formData = new FormData();
    // formData.append('image', file);

    axios.post('http://localhost:3000/profileimg', formData)
      .then(response => {
        // Handle successful upload
        console.log('File uploaded successfully:', response.data);
      })
      .catch(error => {
        // Handle upload error
        console.error('Error uploading file:', error);
      });
  }
  const handleEditClick = () => {
    fileInputRef.current.click();
  }
  return (
    <div className="left-dash min-w-[18vw] bg-zinc-50 py-10 rounded-md">
      <div className="profile-detail flex flex-col items-center justify-center border-b-2 border-zinc-200 ">
      <form hidden id="uploadform" action="/fileupload" method="post" encType="multipart/form-data">
            <input type="file"  name="image" onChange={handleFileChange} />
        </form>
        <div className="profile-img relative  overflow-hidden">
          <img
            className="rounded-full h-[12vh] w-[12vh] object-cover "
            src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
            alt=""
          />
          <MdEdit className="absolute right-1 bottom-0 w-6 h-6 rounded text-white cursor-pointer " onClick={handleEditClick} />
          
        </div>
        <div className="profile-name flex flex-col items-center py-4 ">
          <h1 className="capitalize font-semibold ">P Shashidhar reddy</h1>
          <h4 className="text-zinc-700 font-light text-xs">8310852112</h4>
          <h4 className="text-zinc-700 font-light text-xs">abho@gmail.com</h4>
        </div>
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
  );
}

export default Leftdash;
