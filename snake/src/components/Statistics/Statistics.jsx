import React from 'react';
import { connect } from 'react-redux';
import { getDisplayValue } from '../../utils/helper';
import './Statistics.scss';
import { Table } from 'react-bootstrap';

const Statistics = ({ statistics }) => {
  const results = [...statistics.results.slice(0, 10)].sort(
    (a, b) => b.score - a.score
  );

  const resultsList = results.map((res, i) => {
    const minutes = getDisplayValue(Math.trunc(res.timer / 60));
    const seconds = getDisplayValue(res.timer % 60);

    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{res.score}</td>
        <td>
          {minutes}:{seconds}
        </td>
      </tr>
    );
  });

  return (
    <div className="Statistics">
      <h1>Statistics</h1>

      {resultsList.length ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{resultsList}</tbody>
        </Table>
      ) : (
        <h3>No games yet</h3>
      )}
    </div>
  );
};

const mapStateToProps = (store) => ({
  statistics: store.statistics,
});

export default connect(mapStateToProps)(Statistics);
