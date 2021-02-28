import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <span>{res.score}</span>
        <span>
          {getDisplayValue(Math.trunc(res.timer / 60))}:
          {getDisplayValue(res.timer % 60)}
        </span>
      </li>
    );
  });

  return (
    <div className="Statistics">
      <NavLink to="/">Go to game</NavLink>

      <ul className="collection with-header">
        <li className="collection-header">
          <span>Score</span>
          <span>Time</span>
        </li>

        {resultsList}
      </ul>
    </div>
  );
};

const mapStateToProps = (store) => ({
  statistics: store.statistics,
});

export default connect(mapStateToProps)(Statistics);
