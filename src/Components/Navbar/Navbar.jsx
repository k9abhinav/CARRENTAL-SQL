import "./Navbar.css";
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { useEffect,useState } from "react";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [auth, setauth] = useState(false);
  const [name, setname] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
  axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000")
   .then((res) => {
    if (res.data.Status === "Success") {
      setauth(true);
      setname(res.data.userData.fullname);
      
    } else {
      setauth(false);
    }
  })
  .then((err) => console.log(err));

  },[name,auth]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  useEffect(()=> {
    
  axios.defaults.withCredentials = true;
  })
  const handleLogout = () => {
  axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3000/logout")
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        setauth(false);
        setname("");
      })
      .catch((err) => console.log(err));
      window.location.reload();
  };

  return (
    <div className="nav ">
      <div className="nav-logo text-6xl font-semibold" >Fleeto.</div>
      <ul className="nav-menu font-bold  uppercase">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mybookings">Dashboard</Link>
        </li>
        <li>
          <Link to="/carlist">Carlist</Link>
        </li>
        <li className="">
         <button onClick={toggleDropdown} className="relative  bg-[#F0F3F5] rounded-md p-2 flex flex-col items-center ">
         {auth ?  <button className=" flex items-center gap-2 ">{name.length > 6 ? name.substring(0, 6) + "..." : name}<RiAccountCircleFill  size={28} /><IoIosArrowDown /></button> :  <button className=" flex items-center gap-2"><RiAccountCircleFill  size={28} /><IoIosArrowDown /></button>  }
         {dropdownVisible && (
          <ul className="dropdown-menu absolute top-[5vh] bg-[#F0F3F5] rounded-bl-md rounded-br-md p-2 min-w-max">
            {auth ? <div className="flex flex-col items-start w-full text-md  "><Link to="/dash" className="" >Dashboard</Link><button onClick={handleLogout}>Logout</button></div> : <div className="flex flex-col items-start w-full text-md"><Link to="/login" className="" >Login/Register</Link></div>}
          </ul>
         )}
          </button>         
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
