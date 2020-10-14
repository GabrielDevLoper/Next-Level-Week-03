import React from 'react';
import { Link } from 'react-router-dom';


import '../styles/pages/landing.css';
import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../images/logo.svg';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
     <div className="content-wrapper">
      <img src={logoImg} alt="Happy"/>


      <main>
        <h1>Leve a felicidade para o mundo</h1>
        <p>Visite orfanatos e mude o dia
            de muitas crianças.</p>
      </main>

      <div className="location">
        <strong>Maceió</strong>
        <span>Alagoas</span>
      </div>

      <div>
        {/* <a href="/orfanatos" className="enter-app"> */}
          <Link to="/orfanatos" className="enter-app">
            <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
          </Link>
        {/* </a> */}
      </div>
     </div>
    </div>
  );
}

export default Landing;