import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { unfocusButton } from './utils/helper';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import Game from './components/Game/Game';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Settings from './components/Settings/Settings';
import Statistics from './components/Statistics/Statistics';

function App(props) {
  const { player } = props.statistics;

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

      {player ? (
        <Route path="/" exact component={Game} />
      ) : (
        <Route path="/" exact component={Registration} />
      )}

      <Redirect to="/" component={Game} />

      <Footer />
    </div>
  );
}

const mapStateToProps = (store) => ({
  statistics: store.statistics,
});

export default connect(mapStateToProps)(App);
