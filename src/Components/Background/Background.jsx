import './Background.css';
import React, { useEffect, useState } from 'react';
import video1 from '../../Assets/video1.mp4';
import image1 from '../../Assets/image11.jpg';
import image2 from '../../Assets/image22.jpg';
import image3 from '../../Assets/image2.png';

const Background = ({ playStatus, heroCount }) => {
  // const [currentBackground, setCurrentBackground] = useState(0);
  // const backgrounds = [image1, image2, image3];

  // useEffect(() => {
  //   const interval = setInterval(() => {
     
  //     setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
  //   }, 3000); 

  //   return () => clearInterval(interval); 
  // }, [currentBackground]);

  return (
    <div className='background-container'>
      {/* {currentBackground !== backgrounds.length - 1 ? (
        <img src={backgrounds[currentBackground]} className='background fade-in' alt={`Image ${currentBackground + 1}`} />
      ) : (
        <video className='background' autoPlay loop muted>
          <source src={video1} type='video/mp4' />
        </video>
      )} */}
      <video className='background' autoPlay loop muted>
          <source src={video1} type='video/mp4' />
        </video>
    </div>
  );
}

export default Background;

