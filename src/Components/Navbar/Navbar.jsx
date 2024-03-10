import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo text-6xl font-semibold" >Fleeto.</div>
      <ul className="nav-menu font-bold blend-mode-difference uppercase">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dash">Dashboard</Link>
        </li>
        <li>
          <Link to="/carlist">Carlist</Link>
        </li>
        <li>
          <Link to="/"></Link>Contact
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
