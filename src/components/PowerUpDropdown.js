import React from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.select`
  width: 50px;
  border-radius: 4px;
  -webkit-appearance: none;
  padding: 4px 8px;
  outline: none;
  cursor: pointer;
`;

const PowerUpDropdown = ({ updateNote, note }) => {
  const options = [
    'heart',
    'corner-up-right',
    'key',
    'map',
    'message-square',
    'map-pin',
    'zap',
    'archive',
  ];

  return (
    <StyledDropdown
      onChange={(e) => updateNote({ ...note, category: e.target.value })}
      value={note.category}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </StyledDropdown>
  );
};

export default PowerUpDropdown;
