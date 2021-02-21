import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';

const Game = (props) => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { gameLevel } = props.settings;

  const startStopGame = () => {
    setIsPlaying((prev) => !prev);
  };

  const setFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const increaseScore = () => setScore((prev) => prev + 1);

  return (
    <div className="Game">
      <Progress score={score} time={'00:00'} />

      <GameBoard
        score={score}
        isPlaying={isPlaying}
        level={gameLevel.value}
        scoreHandler={increaseScore}
        startStopHandler={startStopGame}
      />

      <Controls
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        startStopGame={startStopGame}
        setFullScreen={setFullScreen}
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  settings: store.settings,
});

export default connect(mapStateToProps)(Game);
