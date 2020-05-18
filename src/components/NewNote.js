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

const NewNote = ({ createNote }) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (note !== '') {
      createNote(note);
      setNote('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Note"
        onChange={(e) => setNote(e.target.value)}
        value={note}
      />
    </StyledForm>
  );
};

export default NewNote;
