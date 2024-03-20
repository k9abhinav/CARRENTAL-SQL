import axios from 'axios';
import React, { useState, useEffect } from 'react';


function PaymentPage() {
  
  const [redirecting, setRedirecting] = useState(false);
  const [payValues, setpayValues] = useState({
  
    order_id:'' ,
    status:'Success',
    price:''
   })
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      setRedirecting(true);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(redirectTimer);
  }, []);

  useEffect(() => {
    // axios.defaults.withCredentials = true;
    if (redirecting) {
    insertPayment();
      window.location.href = "/mybooking";
    }
  }, [redirecting]);


  const [latestOrderId, setlatestOrderId] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/getOrderID')
      .then(res => {
        console.log(res.data[0]);
        setlatestOrderId(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (latestOrderId) {
      setpayValues(prevValues => ({
        ...prevValues,
        order_id: latestOrderId.order_id,
        price: latestOrderId.fare
      }));
      console.log(payValues);
    }
  }, [latestOrderId]);


// useEffect(() => {
//   axios.defaults.withCredentials = true;
//   axios.get('http://localhost:3000/getOrderID')

//  .then(res => {
//       console.log(res.data[0]);
//       setlatestOrderId(res.data[0] )
//       console.log(latestOrderId)
//       {latestOrderId.map((details)=>{
//         setpayValues({...payValues,order_id: details.order_id ,price: details.fareFee});
//       // setpayValues({...payValues,});
//       })}
//       console.log(payValues);
//     })
//     .catch((err) => console.log(err))
// }, []);
 
// useEffect(() => {
//   if (latestOrderId.length > 0) {
//     // Perform actions dependent on latestOrderId
//     const details = latestOrderId[0]; // Assuming you're interested in the first item
//     setpayValues(prevValues => ({
//       ...prevValues,
//       order_id: details.order_id,
//       price: details.fareFee
//     }));
//     console.log(payValues);
//   }
// }, [latestOrderId]);
 const insertPayment = () =>{
  
      axios
     .post("http://localhost:3000/payments",payValues)
     .then((res) => {
          console.log(res);
        })
     .catch((err) => console.log(err));
 }
 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="relative flex justify-center items-center">
      {/* Circle */}
      <div className={`w-20 h-20 border-8 bg-white border-blue-500 rounded-full ${redirecting ? 'opacity-0' : 'opacity-100'} animate-spin overflow-hidden `}>
        {/* Something moving right */}
        <div className="absolute w-4 h-4 bg-black rounded-full animate-moving-right "></div>
      </div>
    </div>
    <div className="ml-4">
      <h1 className="text-xl font-semibold">Please wait...</h1>
    
    </div>
  </div>
  );
}

export default PaymentPage;
