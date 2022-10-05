import { React, useState } from 'react';
// import 'katex/dist/katex.min.css';
// import { InlineMath } from 'react-katex';
import './Home.css';

import Phone from '../assets/remindrsMock.png';
import AppStore from '../assets/appStoreLight.svg';

const Home = () => {
  return (
    <div className='container'>
      <div className='header'>
        <h1>Isaac Van Doren</h1>
        <div className='seperator'></div>
      </div>

      <div className='fp'>Functional programming words</div>

      <img className='remindrsImage' src={Phone} alt='remindrs mobile app'/>
      <div className='remindrs'>
        <em><strong>reminders</strong></em> is a minimalistic app for setting reminders written in React Native.
        <img href='https://apps.apple.com/us/app/remindrs/id1581056770' src={AppStore} alt='download remindrs on the app store'/>
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
