import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { savePlayer } from '../../reducers/statistics';
import { savePlayerToLocalStorage } from '../../utils/helper';
import './Registration.scss';
import { Form, Button } from 'react-bootstrap';

export const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const savePlayerNameHandler = useCallback(() => {
    if (name.trim()) {
      savePlayerToLocalStorage(name);
      dispatch(savePlayer(name));
    }
  }, [name, dispatch]);

  return (
    <div className="Registration">
      <h2>Hello!</h2>

      <Form onSubmit={savePlayerNameHandler}>
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
          <Button variant="secondary" onClick={savePlayerNameHandler}>
            Let's play
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
