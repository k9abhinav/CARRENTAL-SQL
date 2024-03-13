import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { Grid,Card,CardContent,Typography, CardActions,Button } from '@mui/material'
// import Container from '@mui/material/Container'
// import Data from '../Data/Data.json'
// import { CardActionArea } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';

export default function CarList() {
  const [carData, setCarData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/viewcars", carData)
      .then((res) => setCarData(res.data)) //data is from backend
      .catch((err) => console.log(err));
  }, []);
  return (

<div className="container mx-auto p-10">
      <h1 className="text-2xl font-semibold mb-8">List of Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {carData.map((car, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              className="w-full h-56 object-cover rounded-t-lg"
              src={`http://localhost:3000/images/${car.car_image}`}
              alt={car.model}
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{car.model}</h2>
              <p className="text-gray-600 mb-2">Color: {car.color}</p>
              <p className="text-gray-600 mb-2">Type: {car.c_type}</p>
              <p className="text-gray-600 mb-4">Capacity: {car.capacity}</p>
              <Link to={`/carlist/${car.model}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Book
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  




























    // <div className="w-full p-20">
    //   <h1 className="text-xl font-semibold pb-10">List of cars</h1>
    //   <div className=" w-full grid grid-cols-3 gap-10 ">
    //     {Object.keys(carData).map(
    //       (
    //         d,
    //         i //Object.keys(carData) is used to get an array of keys from the carData object.
    //       ) => (
    //         <div key={i} className="outerdiv shadow-md">
    //           <div className="image w-full h-4/6  overflow-hidden">
    //             <img
    //               className="rounded-tr-lg rounded-tl-lg w-full h-full"
    //               src={`http://localhost:3000/images/` + carData[i].car_image}
    //               alt=""
    //             />
    //           </div>
    //           <div className="innerdiv rounded-br-lg rounded-bl-lg  p-5">
              
    //           <div className="font-bold">{carData[i].model}</div>
    //           <div className="font-medium">{carData[i].color}</div>
    //           <div className="">{carData[i].c_type}</div>
    //           <div className="">{carData[i].capacity}</div>
    //           <Link to={`/carlist/${carData[i].model}`}>
    //             <button className="border-[1px]ww border-zinc-900 bg-[blueviolet] px-3 py-1 rounded-md text-white">
    //               Book
    //             </button>
    //           </Link>
    //           </div>
    //         </div>
    //       )
    //     )}
    //   </div>
    // </div>

    /* <Container maxWidth="lg">
        <Typography variant='h4' align='center' style={{marginTop:"50px",color:"white"}}>
            List of Cars

        </Typography>
        <Grid container spacing={5} style={{marginTop:"20px"}}>
            {Data.map((result,index)=>(
                <Grid item xs={12} sm={4} ms={5} key={index}>
                    <Card sx={{ maxWidth: 345 }} style={{padding:"10px",marginBottom:"30px"}}>
      <CardActionArea>

        <CardMedia 
          component="img"
          height="160px"
          width="100px"
          image={result.img}
          
          
          style={{borderRadius:"5px"}}
        />
       <div className='font-bold'>{result.title}</div> 
       <div className='font-medium'>{result.des}</div>
      <img className='size-5' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAb1BMVEX////tihnsgADsggDshADshgDtiRTrfQDthwn75tf65NP76Nr99e/++fT64c/woVr87eH53sn2yaf88OfxpmP1xJ7tjSX0uovwnlXxqGjyrHD3za7zuIXul0LukDL52sT1vpT30rbvmkvzsnzvlTotS165AAADE0lEQVRogeWZ2bqiMBCEJQlNRBRZBDfc3/8Zp/V4RpaQtCG5mG/6Wn+KotLZZrP/oValEOXKD3sTySCQ0cYHO2bBq1jsAb6VP3C5dc/+Fe5F+q9wH9I/wj1IT+UHLlO37HlLOEqfO4VvZRvu1vVFRzhKXziEl7ILl6U7dl+4U+l94S6lr6M+OwiitSP4biAcpe/csBd8yA4C7sb1faiCh3sXbJXjzlzfKxx/ue5A+lrp+Mv16dLVjrtxvRgMzk+xwpvw6dLno46/XJ/U1zMJOjjIzBK8Pucp17KRztL8/E1olkWW1ykwzsVIwtslBecM0jrPiqVea3Y4lo1kTIR6O4b2hIIx2ZTHQzZ4j2R1qMvqKeJL6uAZz9etyvqwSt7oTRV9rdX4HtHptWDdM2fYziMYjoKrZghOK3aepV50PwvnWW9srFnlj32aHTWdaVqFR+ypnowBjh058xXFV1PLTO3Jis3fDXPlng787341dk0H0ZpG5m7p0J2i1sIhHUSv7y7c0QdsXEO4okOoWHEU4IQuQbmaSYAwZ5rZiYqN9GoyXVYjbAd0DRuXFadJdHnSLi+SKXQDG7U/rPt7+DCwkd5Y0sPGyMZqrJyRDQGNvgcWowkCTU7atRHfwwX1RDDWrvjVxalHU+MbOA2cuqE+28DPRLhXz1WnFKYin2LcbKJ4o7GXVjkHyvjEsFit2BltU2cTFnJcLhZhwbhcSHCbsJDjYvM9n52LBB85djJVRGEPjz9pRTokvVp9T/yiVwK8tp3magI8tZz/SfcBD01YdMtJeJjZxbjwMKqqaNw0aT5Pm4+FRYga/13UfOyDE24yDurOEvL7e3pP7kytnh+McGVYJNu33rnYMZV3hLgowiJZ2eun61KBJ8RlEAiIbgoz42aw8QYwsZe9zgKsGblezZr+/jIyTUYx66JPmjngfOqqN97ZrVpw4JWhX1yrtnpmukL+2AIiyA0/xsqDzxbTaMvs/s65kBcz+lkX+R5V/G7+8RaNBByOtKUC1rIWqB4Y6TYwf/CgJq62fyqpgT8IHv479Qfz1ioBWh+VbQAAAABJRU5ErkJggg=="  />
      <hr />
      <div className='font-light'>{result.av}</div>
      {result.desc2}
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           
          </Typography>
          <Typography variant="body2" color="text.secondary">
           
          </Typography>
        </CardContent>
        <CardActions>
        <Link to="/cardetail"><Button variant="contained" size="medium">Book</Button></Link>
        <Button variant="contained" size="medium">More</Button>
        </CardActions>
      </CardActionArea>
    </Card>

                    </Grid>
            ))}

        </Grid>

    </Container> */
  );
}
