import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PowerUpDropdown from './PowerUpDropdown';

import { ReactComponent as Heart } from '../assets/icons/heart.svg';
import { ReactComponent as CornerUpRight } from '../assets/icons/corner-up-right.svg';
import { ReactComponent as Key } from '../assets/icons/key.svg';
import { ReactComponent as MessageSquare } from '../assets/icons/message-square.svg';
import { ReactComponent as MapIcon } from '../assets/icons/map.svg';
import { ReactComponent as MapPin } from '../assets/icons/map-pin.svg';
import { ReactComponent as Zap } from '../assets/icons/zap.svg';
import { ReactComponent as Archive } from '../assets/icons/archive.svg';

const StyledNote = styled.label`
  display: flex;
  align-items: center;
  margin: 12px 0;
  font-size: 1.1em;
  line-height: 21px;

  & > *:not(:last-child) {
    margin-right: 2px;
  }

  svg {
    width: 24px;
    flex-shrink: 0;
  }

  .category-icon {
    margin-right: 6px;
  }
`;

const CheckIcon = styled.svg`
  cursor: pointer;
`;

const DeleteButton = styled.svg`
  color: #c45f5f;
  cursor: pointer;
`;

const TitleInput = styled.input`
  border-radius: 4px;
  -webkit-appearance: none;
  padding: 4px 8px;
  outline: none;
  cursor: pointer;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  font-size: 1em;
`;

const Note = ({
  note,
  note: { checked, title, _id, category },
  deleteNote,
  updateNote,
  edit,
}) => {
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const components = {
    heart: Heart,
    'corner-up-right': CornerUpRight,
    key: Key,
    map: MapIcon,
    'message-square': MessageSquare,
    'map-pin': MapPin,
    zap: Zap,
    archive: Archive,
  };

  const CategoryComponent = components[category];

  return (
    <StyledNote checked>
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

      {edit && (
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
      )}

      {edit ? (
        <PowerUpDropdown updateNote={updateNote} note={note} />
      ) : (
        <CategoryComponent className="category-icon" />
      )}

      {edit && (
        <>
          {checked ? (
            <CheckIcon
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
            </CheckIcon>
          ) : (
            <CheckIcon
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
            </CheckIcon>
          )}
        </>
      )}

      {edit ? (
        <TitleInput
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 && updateNote({ ...note, title: newTitle })}
        />
      ) : (
        title
      )}
    </StyledNote>
  );
};

export default Note;
