import './Hero.css';
import arrow_btn from '../../Assets/arrow_btn.png';
import { Link } from 'react-router-dom';

const Hero = ({ heroData, setHeroCount, heroCount, setPlayStatus, playStatus }) => {
  return (
    <div className='hero'>
      <div className="hero-text">
        {/* <p>{heroData.text1}</p>
        <p>{heroData.text2}</p> */}
      </div>
      <div className="wrapper-hero">
        {/* <div className="hero-explore">
          <p>Rent Now</p>
          <Link to="/carlist"><img src={arrow_btn} alt="" /></Link>
        </div> */}
        {/* <div className="hero-dot-play">
          <ul className='hero-dots'>
            <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Hero;
