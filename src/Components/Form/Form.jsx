import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
let fareDoor = 350;


function Form() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fareFee, setFareFee] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState('self');
  const [isAgreed, setIsAgreed] = useState(false);
  const [car, setCar] = useState();
  const [values, setValues] = useState({

    car_id:'',
    startDate: '',
    endDate: '',
    dType:'',
    fareFee:''
  });
  useEffect(() => {
    calculateFare();
  }, [selectedDelivery, fromDate, toDate]);
  
  function DeliveryOptions({ onDeliverySelect }) {
    return (
      <div className="choose flex items-center gap-5 text-black">
        <div
          className="w-1/4 h-40 bg-zinc-100 p-3 flex justify-between rounded-lg border-[2px] border-zinc-500 cursor-pointer"
          onClick={() => onDeliverySelect('self')} 
        >
          <h1 className="w-3/4 mr-2 font-semibold">Self Pickup</h1>
          <h2 className="text-green-600 font-medium">Free</h2>
        </div>
        <div
          className="w-1/4 h-40 bg-zinc-100 p-3 flex justify-between rounded-lg border-[2px] border-zinc-500 cursor-pointer"
          onClick={() => onDeliverySelect('door')} 
        >
          <h1 className="w-3/4 mr-2 font-semibold">Doorstep delivery</h1>
          <div className="text-green-600 font-medium">
            <h2>Rs.{fareDoor}+</h2>
            <h2>Rs.60/KM</h2>
          </div>
        </div>
      </div>
    );
  }
  function calculateFare() {
    let fare = selectedDelivery === 'door' ? fareDoor : 0;
    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      // console.log(startDate,endDate)
      const durationInMs = endDate - startDate;
      // console.log(durationInMs)
      const durationInHrs = durationInMs / (1000 * 60 * 60);
      // console.log(durationInHrs)
      let additionalCost = durationInHrs * car.rate;    //from selected model
      fare+= additionalCost;
      console.log("work")
    }
    setFareFee(fare);
    setValues({...values,fare:fare})
    // console.log(fare)
    
  }
  function handleAgreement() {
    setIsAgreed(!isAgreed);
  }
  function handleDeliverySelect(deliveryOption) {
    setSelectedDelivery(deliveryOption)
    setValues({ ...values,dType:deliveryOption})
  }

   function handleDateChange(e, type) {
    if (type === 'from') {
      setFromDate(e.target.value)
    }
    else if (type === 'to') {
      setToDate(e.target.value)
      
     }  
     setValues({...values,[e.target.name]:e.target.value})
     
  }
  
  const { model } = useParams();
  // console.log(model)

  useEffect(() => {
    axios.get(`http://localhost:3000/viewcars?model=${model}`)
      .then(res => {
        const selectedModel=res.data.find((car) => car.model === model)
        setCar(selectedModel)
        setValues({ ...values, car_id: selectedModel.car_id })
      })
      .catch(err=>console.log(err))
  }, [])

  console.log(values)
  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://localhost:3000/rent`, values)
      .then(res => console.log(res.data))
    .catch(err=>console.log(err))
  }
  // console.log("From date:"+fromDate) 
  // console.log("To date:"+toDate)
  return (
    <form onSubmit={handleSubmit}>
      <div className='out flex items-center w-full bg-zinc-100'>
      <div className='w-[75%] p-20 mb-10'>        
        <h1 className="text-lg my-2 mt-5 font-semibold">
          Choose how you want to get your car
        </h1>
        <h1 className="text-sm text-slate-500">
        Select the delivery option to confirm your delivery address.Host convenience fee of ₹350 will be added for delivery
        </h1>
        <hr className="border-[0.5px] border-zinc-200 my-2 " />
        <DeliveryOptions onDeliverySelect={handleDeliverySelect}/>   
        {/* DeliveryOptions is a component */}
      
      <div className='my-10 flex flex-col'>
        <h1 className='my-2 text-lg font-semibold'>Booking the date and time:</h1>
        <div className="flex gap-10 items-center">
        <label htmlFor="from">From</label>
          <input onChange={(e)=>handleDateChange(e,'from')} type="datetime-local" value={fromDate} className='text-black p-1' name="startDate"  />
          <label htmlFor="to">To</label>
            <input onChange={(e) =>
              handleDateChange(e, 'to')
            } type="datetime-local" value={toDate} className='text-black p-1' name="endDate" />
        </div>
      </div>

      <div className="agreement">
        <h1 className="text-lg my-2 mt-5 font-semibold">Agreement policy</h1>
        <h1 className="text-sm text-slate-500">I hereby agree to the terms and conditions of the Lease Agreement with Host<input type="checkbox" name="check" className="ml-12" onChange={handleAgreement} /></h1>
        <Link to="/policy" className='text-green-600 text-sm'><u>See more</u></Link>
      </div>
      </div>
      <div className="w-[25%] mx-12 h-52 bg-white p-2 rounded-md flex flex-col justify-between">
        <h1 className='my-1 text-lg font-semibold'>Fare Summary</h1>
        <p className='my-1 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <h1 id="fareCost" className='my-1 text-md'>Rs.{fareFee}</h1>
       <button className='border-[1px] border-zinc-500 p-2 rounded-md bg-violet-500 text-white'
          disabled={!isAgreed || !fromDate || !toDate}>Proceed to pay</button>
        
        {/* disabled if user hasn't agreed in the sense the checkbox is unchecked i.e false so !false is true which will make it disabled */}
      </div>


      </div>
      </form>
  )
}

export default Form