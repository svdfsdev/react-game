import React from 'react';
import { connect } from 'react-redux';
import './Statistics.scss';
import { getDisplayValue } from '../../utils/helper';

const Statistics = ({ statistics }) => {
  const results = [...statistics.results.slice(0, 10)].sort(
    (a, b) => b.score - a.score
  );

  const resultsList = results.map((res, i) => {
    return (
      <li className="collection-item" key={i}>
        <span className="number">{i + 1}.</span>
        <span className="score">{res.score}</span>
        <span className="time">
          {getDisplayValue(Math.trunc(res.timer / 60))}:
          {getDisplayValue(res.timer % 60)}
        </span>
      </li>
    );
  });

  return (
    <div className="Statistics">
      <h2>Statistics</h2>

      {resultsList.length ? (
        <ul className="collection with-header">
          <li className="collection-header">
            <span className="number">#</span>
            <span className="score">Score</span>
            <span className="time">Time</span>
          </li>

          {resultsList}
        </ul>
      ) : (
        <h2>No games yet</h2>
      )}
    </div>
  );
};

const mapStateToProps = (store) => ({
  statistics: store.statistics,
});

export default connect(mapStateToProps)(Statistics);
