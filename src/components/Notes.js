import React from 'react';
import styled from 'styled-components';
import Note from './Note';

const StyledNotes = styled.div`
  padding: 12px 8px;
`;

const HrWrapper = styled.div`
  position: relative;
`;

const DoneWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 1px;
  font-size: 0.8em;
`;

const Notes = ({ notes, deleteNote, updateNote, edit }) => {
  const [uncheckedNotes, checkedNotes] = notes.reduce(
    ([unchecked, checked], el) =>
      !el.checked ? [[...unchecked, el], checked] : [unchecked, [...checked, el]],
    [[], []]
  );

  return (
    <StyledNotes>
      {uncheckedNotes.map((note, i) => (
        <Note
          edit={edit}
          key={i}
          note={note}
          deleteNote={deleteNote}
          updateNote={updateNote}
        />
      ))}

      {((checkedNotes.length !== 0 && uncheckedNotes.length !== 0) ||
        (checkedNotes.length !== 0 && uncheckedNotes.length === 0)) && (
        <HrWrapper>
          <hr />
          <DoneWrapper>DONE</DoneWrapper>
        </HrWrapper>
      )}

      {checkedNotes.map((note, i) => (
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
