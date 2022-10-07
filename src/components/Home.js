import { React } from 'react';
// import 'katex/dist/katex.min.css';
// import { InlineMath } from 'react-katex';
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
        <p> <strong>Hello! I'm Isaac.</strong> <br></br> I love math, computer science, philosophy, and learning in general.
          I've especially been enjoying <a href="https://haskell.org" target="blank">Haskell</a> for its high level of abstraction, novelty, and that it forces me to stretch my mind. </p>
        
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
        <a href='https://github.com/isaacvando' target='blank'>Developed by Isaac Van Doren</a>
        <p>Built with React</p>
      </div>
    </div>
  );
}

export default Home;








// *** Header idea ***
// const Home = () => {
//   const [mouseOn, setMouseOn] = useState('');
//   const Character = (letter) => {
//     return (
//     <div className='character' onMouseOver={() => setMouseOn(letter)} onMouseOut={() => setMouseOn('')}>
//       {/* {mouseOn === 'I' ? <div>X</div> : <div>I</div>} */}
//       foo
//     </div>
//     )
//   };

//   return (
//    <div className='name'>
//     <div className='character' onMouseOver={() => setMouseOn('I')} onMouseOut={() => setMouseOn('')}>
//       {mouseOn === 'I' ? <InlineMath math='\mathbb{I}' /> : <InlineMath>{String.raw `\text{I}`}</InlineMath>}
//     </div>
//     <div id='S' className='character' onMouseOver={() => setMouseOn('S')} onMouseOut={() => setMouseOn('')}>
//       {mouseOn === 'S' ? <InlineMath>S_n</InlineMath> : <InlineMath>{String.raw `\text{S}`}</InlineMath>}
//     </div>
//     <div className='character' onMouseOver={() => setMouseOn('A1')} onMouseOut={() => setMouseOn('')}>
//       {mouseOn === 'A1' ? <InlineMath>\alpha</InlineMath> : <InlineMath>{String.raw `\text{A}`}</InlineMath>}
//     </div>
//     <div className='character' onMouseOver={() => setMouseOn('A2')} onMouseOut={() => setMouseOn('')}>
//       {mouseOn === 'A2' ? <InlineMath math='\mathbb{A}' /> : <InlineMath>{String.raw `\text{A}`}</InlineMath>}
//     </div>
//     <div className='character' onMouseOver={() => setMouseOn('C')} onMouseOut={() => setMouseOn('')}>
//       {mouseOn === 'C' ? <InlineMath math='\mathbb{C}' /> : <InlineMath>{String.raw `\text{C}`}</InlineMath>}
//     </div>



//     {/* <div className='character'>S</div>
//     <div className='character'>A</div>
//     <div className='character'>A</div>
//     <div className='character'>C</div>
//     <div className='space'></div>
//     <div className='character'>V</div>
//     <div className='character'>A</div>
//     <div className='character'>N</div>
//     <div className='space'></div>
//     <div className='character'>D</div>
//     <div className='character'>O</div>
//     <div className='character'>R</div>
//     <div className='character'>E</div>
//     <div className='character'>N</div> */}
//    </div>
//   );
// };

// export default Home;
