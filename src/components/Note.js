import React from 'react';
import styled from 'styled-components';

const StyledNotes = styled.label`
  display: flex;
  align-items: center;
  margin: 4px 0;

  svg {
    margin-right: 4px;
    width: 20px;
    cursor: pointer;
  }
`;

const DragHandle = styled.svg`
  color: #6e6e6e;
`;

const DeleteButton = styled.svg`
  color: #c45f5f;
`;

const Note = ({ note, note: { checked, title, _id }, deleteNote, updateNote }) => {
  return (
    <StyledNotes checked>
      {/* <DragHandle
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </DragHandle> */}

      <DeleteButton
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={() => deleteNote(_id)}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </DeleteButton>

      {checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => updateNote({ ...note, checked: !checked })}
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => updateNote({ ...note, checked: !checked })}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
      )}
      {title}
    </StyledNotes>
  );
};

export default Note;
