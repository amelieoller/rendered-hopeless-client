import React from 'react';
import styled from 'styled-components';
import Note from './Note';

const StyledNotes = styled.div`
  padding: 12px 8px;
`;

const Notes = ({ notes, deleteNote, updateNote, edit }) => {
  return (
    <StyledNotes>
      {notes
        .filter((note) => !note.checked)
        .map((note, i) => (
          <Note
            edit={edit}
            key={i}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))}
      <hr />

      {notes
        .filter((note) => note.checked)
        .map((note, i) => (
          <Note
            edit={edit}
            key={i}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))}
    </StyledNotes>
  );
};

export default Notes;
