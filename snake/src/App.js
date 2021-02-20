import React from 'react';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import Game from './components/Game/Game';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
