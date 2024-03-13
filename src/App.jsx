import Navbar from "./Components/Navbar/Navbar";
import LocomotiveScroll from 'locomotive-scroll';
import Myaccount from "./Components/Dashboard/Myaccount";
import Mybookings from "./Components/Dashboard/Mybookings";
import CarList from "./Components/CarList/CarList";
import SUVcars from "./Components/CarList/SUVcars";
import Offroad from "./Components/CarList/Offroad";
import Convertible from "./Components/CarList/Convertible";
import Sedancars from "./Components/CarList/Sedancars";
import Hatchback from "./Components/CarList/Hatchback";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import CarDetail from "./Components/CarDetail/CarDetail";
import Home from "./Components/Home/Home";
import Payment from "./Components/Payment/Payment";
import MainPage from "./Components/MainPage";
import AdminCar from "./Components/AdminCar/AdminCar";
import AdminOrder from "./Components/AdminOrders/AdminOrder";
import AdminAccount from "./Components/AdminAccount/AdminAccount";
import AdminCarAdd from "./Components/AdminCar/AdminCarAdd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";

const App = () => {
  
  
  // eslint-disable-next-line no-unused-vars
  const scroll = new LocomotiveScroll();
  return (
    <div data-scroll-container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/carlist/:model/proceed" element={<Form />} />
          <Route path="/carlist/:model" element={<CarDetail />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/mybooking" element={<Mybookings />}/>
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<MainPage />} />
          <Route path="/car" element={<AdminCar />} />
          <Route path="/order" element={<AdminOrder/>} />
          <Route path="/account" element={<AdminAccount />} />
          <Route path="/addcar" element={<AdminCarAdd/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/suv" element={<SUVcars/>} />
          <Route path="/offroad" element={<Offroad/>} />
          <Route path="/hatchback" element={<Hatchback/>} />
          <Route path="/convertible" element={<Convertible/>} />
          <Route path="/sedan" element={<Sedancars/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
