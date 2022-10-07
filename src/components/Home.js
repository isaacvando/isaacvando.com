import { React } from 'react';
import './Home.css';

import Phone from '../assets/remindrsMock.png';
import AppStore from '../assets/appStoreDark.svg';
import PlayStore from '../assets/playStore.png';
import Isaac from '../assets/jumping.jpeg';
import Haskell from '../assets/haskell.png';
import LinkedIn from '../assets/LinkedIn.png';
import GitHub from '../assets/GitHub.png';

const Home = () => {
  return (
    <div className='container'>
      <div className='header'>
        <h1 className='name'>Isaac Van Doren</h1>
        <div className='marks'>
          <a href="https://github.com/isaacvando" target="blank">
            <img className='mark' src={GitHub} alt='Isaac Van Doren on GitHub'></img>
          </a>
          <a href="https://linkedin.com/in/isaacvando" target="blank">
            <img className='mark' src={LinkedIn} alt='Isaac Van Doren on LinkedIn'></img>
          </a>
        </div>
      </div>
      <div className='about'>
        <p> <strong Style={"font-size: 25px"}>Hello! I'm Isaac.</strong> <br></br> <br></br> I love math, computer science, philosophy, and learning in general.
          I've especially been enjoying <a href="https://haskell.org" target="blank">Haskell</a> for its high level of abstraction, novelty, and that it forces me to stretch my mind. 
        </p>
      </div>
      <img className='isaacImage' src={Isaac} alt="I got married!"/>
      <p className='fpSig'>I'm leading a special interest group on functional programming. It's been a blast getting to share my excitement about all the cool things Haskell can do with other people. 
        Plus I get to take my knowledge to the next level by figuring out how to explain concepts to other people. You can check out my notes on <a href="https://github.com/isaacvando/FunctionalProgrammingSIG" target="blank">GitHub</a>.</p>
      <img className='fpSigImage' src={Haskell} alt="Haskell logo"></img>
      <img className='remindrsImage' src={Phone} alt='remindrs mobile app'/>
      <div className='remindrs'>
        <p>
          <em><strong>remindrs</strong></em> is a minimalistic app for setting reminders that I wrote in React Native.
        </p>
        <div className='badges'>
          <a href='https://apps.apple.com/us/app/remindrs/id1581056770' target='blank'>
            <img className='AppStoreBadge' src={AppStore} alt='Download remindrs on the App Store'/>
          </a>
          <a href='https://play.google.com/store/apps/details?id=com.remindrs' target='blank'>
            <img className='PlayStoreBadge' src={PlayStore} alt='Download remindrs on the Google Play Store'/>
          </a>
        </div>
      </div>
      <div className='footer'>
        <a href='https://github.com/isaacvando' target='blank'>Developed by
        <img className='footerImage' src={GitHub} alt="Isaac Van Doren on GitHub"></img>Isaac Van Doren</a>
      </div>
    </div>
  );
}

export default Home;
