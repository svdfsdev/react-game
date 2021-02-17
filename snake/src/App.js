import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetUser, setUser } from './actions/gameActions';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';

function App(props) {
  const { setUser, resetUser } = props;
  const { score, duration } = props.game.game;
  const { name, isLogin, email } = props.game.user;

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

const mapStateToProps = (store) => ({
  game: store.game,
  settings: store.settings,
  statistics: store.statistics,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: () => dispatch(setUser()),
  resetUser: () => dispatch(resetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
