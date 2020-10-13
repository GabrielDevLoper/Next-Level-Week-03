import React from 'react';
import './styles/global.css';
import './styles/pages/landing.css';

import logoImg from './images/logo.svg';

const App: React.FC = () => {
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
        <a href="#" className="enter-app">
          Entrar
        </a>
      </div>
     </div>
    </div>
  )

}

export default App;