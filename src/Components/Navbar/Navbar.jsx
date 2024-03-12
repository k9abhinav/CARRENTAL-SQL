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

  useEffect(() => {
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


  },[])

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="nav">
      <div className="nav-logo text-6xl font-semibold" >Fleeto.</div>
      <ul className="nav-menu font-bold  uppercase">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dash">Dashboard</Link>
        </li>
        <li>
          <Link to="/carlist">Carlist</Link>
        </li>
        <li className="">
         <button onClick={toggleDropdown} className="relative  bg-slate-50 rounded-md p-2 flex flex-col items-center">
         {auth ?  <button className=" flex items-center gap-2">{name.length > 6 ? name.substring(0, 6) + "..." : name}<RiAccountCircleFill  size={28} /><IoIosArrowDown /></button> :  <button className=" flex items-center gap-2">Sign in <RiAccountCircleFill  size={28} /><IoIosArrowDown /></button>  }
         {dropdownVisible && (
          <ul className="dropdown-menu absolute top-[5vh] bg-slate-50 rounded-bl-md rounded-br-md p-2 min-w-inherit">
            {auth ? <Link to="/dash">Dashboard</Link> : <Link to="/login">Login / Register</Link>}
          </ul>
         )}
 
          </button>         
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
