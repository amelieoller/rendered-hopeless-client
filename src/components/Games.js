import React from 'react';
import styled from 'styled-components';

const StyledGames = styled.select`
  width: 100%;
  border-radius: 0;
  -webkit-appearance: none;
  padding: 8px;
  outline: none;
  font-size: 1em;
  cursor: pointer;
`;

const Games = ({ games, selectGame, selectedGameId }) => {
  return (
    <StyledGames onChange={(e) => selectGame(e.target.value)} value={selectedGameId}>
      <option value="">Select A Game</option>
      {games.map((game) => (
        <option key={game._id} value={game._id}>
          {game.title}
        </option>
      ))}
    </StyledGames>
  );
};

export default Games;
