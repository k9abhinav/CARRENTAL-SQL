import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function AdminCarAdd() {
  const [data,setData]=useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/viewcars')
      .then(res => setData(res.data[0]))
      .catch(err=>console.log(err))
  }, [])
  // console.log(data)
    const [values, setValues] = useState({
      cno: ''
    })
    const [file, setFile] = useState();

    const handleChange = (e) => {
      if (e.target.name === 'cno') {
        setValues({ ...values, [e.target.name]: e.target.value });
      } else if (e.target.name === 'car_image') {
        setFile(e.target.files[0]);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('cno', values.cno);
      formData.append('car_image', file);
  
      axios.post('http://localhost:3000/addcar', formData)
        .then(res => {
          console.log("updated successfully");
          console.log(values, file);
        })
        .catch(err => console.log(err));

    };
  return (
    <div className="w-full bg-zinc-100 flex">
      <div className="left-0 px-20 mr-8 h-screen border-zinc-900 border-2 flex justify-center items-center">
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

      <div className="right w-full ">
        <h1>Car</h1>
        <div className="details w-full px-10 py-5">
          <div className="btns">
            <Link to="/addcar">
              <button className="border-[2px] bg-zinc-300 mr-5 p-2 rounded-md">
                Add
              </button>
            </Link>
            <Link to="/car">
              <button className="border-[2px] bg-zinc-300 mr-5 p-2 rounded-md">
                View
              </button>
            </Link>
          </div>
          <div className="addcar items-center flex mt-20">
            <div className="w-3/4 mx-auto bg-white rounded p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Car Information</h2>

              <form onSubmit={handleSubmit}>
                
                {/* Registration Number */}
                <div className="mb-4">
                  <label
                    htmlFor="cno"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Registration Number:
                  </label>
                  <input
                    type="text"
                    // pattern="\^[A-Z]{2}-[0-9]{2}-[A-Z]{1,2}-[0-9]{4}$\"
                    id="cno"
                    name="cno"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    onChange={handleChange}
                    required
                  />
                </div>

                
                {/* Car image */}
                <div className="mb-4">
                  <label
                    htmlFor="car_image"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Car image:
                  </label>
                  <input
                    type="file"
                    // pattern="\^[A-Z]{2}-[0-9]{2}-[A-Z]{1,2}-[0-9]{4}$\"
                    id="car_image"
                    name="car_image"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    onChange={handleChange}
                    required
                  />
                </div> 
                

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:border-blue-700"
                >
                  Submit
                </button>
              </form>
              

              <div>
                <img src={`http://localhost:3000/images/`+data.car_image} alt="" />

              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCarAdd;
