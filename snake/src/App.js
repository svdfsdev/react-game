import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import Game from './components/Game/Game';
import Navbar from './components/Navbar/Navbar';
import Statistics from './components/Statistics/Statistics';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Route path="/statistics" component={Statistics} />

      <Route path="/" exact component={Game} />

      <Footer />
    </div>
  );
}

export default App;
