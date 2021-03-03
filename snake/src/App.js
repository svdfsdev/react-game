import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import Game from './components/Game/Game';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Statistics from './components/Statistics/Statistics';
import { unfocusButton } from './utils/helper';

function App() {
  useEffect(() => {
    const btns = document.querySelectorAll('button');

    btns.forEach((el) => el.addEventListener('click', unfocusButton));

    return () => {
      btns.forEach((el) => el.removeEventListener('click', unfocusButton));
    };
  });

  return (
    <div className="App">
      <Header />

      <Route path="/statistics" component={Statistics} />

      <Route path="/settings" component={Settings} />

      <Route path="/" exact component={Game} />

      <Footer />
    </div>
  );
}

export default App;
