import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setPlayer } from '../../actions/statisticsActions';
import './Registration.scss';
import { Form, Button } from 'react-bootstrap';

const Registration = (props) => {
  const [name, setName] = useState('');
  const { setPlayer } = props;

  const saveNameHandler = () => {
    setPlayer(name.trim());
  };

  return (
    <div className="Registration">
      <h2>Hello!</h2>

      <Form onSubmit={saveNameHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Input your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted">
            Necessary for statistics storage
          </Form.Text>
          <Button variant="secondary" onClick={saveNameHandler}>
            Let's play
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (store) => ({
  statistics: store.statistics,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayer: (name) => dispatch(setPlayer(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
