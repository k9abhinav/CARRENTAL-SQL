import React from 'react'
import { useEffect, useState } from "react";
import About from './About'
import Team from './Team'
import Terms from './Terms'

import Hero from "../Hero/Hero";
import Background from "../Background/Background";
import Categories from './Categories';
function Home() {
  let heroData = [
    { text1: "Drive your journey", text2: "Rent joy" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give in to ", text2: "your passion" },
  ];
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setHeroCount((count) => {
        return count === 3 ? 0 : count + 1;
      });
    }, 2500);
  }, []);
  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
          />
      <Categories />
      <About />
      <Team />
      <Terms/>
        {/* <div className="LOGIN w-full h-[50vh] flex items-center justify-around font-semibold text-3xl text-white bg-slate-700">
          ---LINKS---
        <Link to="/login">LOGINN</Link>
        <Link to="/register">REGISTER</Link>
        </div> */}
    </div>
  )
}

export default Home
