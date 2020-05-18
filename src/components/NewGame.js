import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;

  input {
    width: 100%;
    padding: 8px;
    outline: none;
  }
`;

const NewGame = ({ createGame }) => {
  const [game, setGame] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (game !== '') {
      createGame(game);
      setGame('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Game"
        onChange={(e) => setGame(e.target.value)}
        value={game}
      />
    </StyledForm>
  );
};

export default NewGame;
