import React from 'react';
import styled from 'styled-components';
import Note from './Note';

const StyledNotes = styled.div`
  margin: 12px 8px;
`;

const Notes = ({ notes, deleteNote, updateNote }) => {
  return (
    <StyledNotes>
      {notes
        .filter((note) => !note.checked)
        .map((note, i) => (
          <Note key={i} note={note} deleteNote={deleteNote} updateNote={updateNote} />
        ))}
      <hr />

      {notes
        .filter((note) => note.checked)
        .map((note, i) => (
          <Note key={i} note={note} deleteNote={deleteNote} updateNote={updateNote} />
        ))}
    </StyledNotes>
  );
};

export default Notes;
