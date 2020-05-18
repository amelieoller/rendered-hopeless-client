import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as Heart } from '../assets/icons/heart.svg';
import { ReactComponent as CornerUpRight } from '../assets/icons/corner-up-right.svg';
import { ReactComponent as Key } from '../assets/icons/key.svg';
import { ReactComponent as MessageSquare } from '../assets/icons/message-square.svg';
import { ReactComponent as MapIcon } from '../assets/icons/map.svg';
import { ReactComponent as MapPin } from '../assets/icons/map-pin.svg';
import { ReactComponent as Zap } from '../assets/icons/zap.svg';
import { ReactComponent as Archive } from '../assets/icons/archive.svg';

const DropdownWrapper = styled.div`
  position: relative;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OtherIcons = styled.div`
  position: absolute;
  top: -3px;
  left: 12px;
  z-index: 1;
  color: black;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
  background: #e4e4e4;
  padding: 2px;

  svg {
    padding: 4px;
    cursor: pointer;
    width: 30px !important;
    background: white;
    border-radius: 4px;

    /* &:not(:nth-child(3n + 3)) {
      border-right: 1px solid #c8c8c8;
    }

    &:nth-child(-n + 6) {
      border-bottom: 1px solid #c8c8c8;
    } */

    &:hover {
      color: #294fb9;
    }
  }
`;

const PowerUpDropdown = ({ updateNote, note, note: { category } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('message-square');

  useEffect(() => {
    setSelectedIcon(category);
  }, [category]);

  const handleIconSelect = (icon) => {
    updateNote({ ...note, category: icon });
    setIsOpen(false);
  };

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

  const IconComponent = components[selectedIcon];

  return (
    <DropdownWrapper>
      <IconComponent onClick={() => setIsOpen(true)} />

      {isOpen && (
        <OtherIcons onBlur={() => console.log('hi')}>
          {Object.keys(components).map((icon) => {
            const IconSelectComponent = components[icon];

            return (
              <IconSelectComponent key={icon} onClick={() => handleIconSelect(icon)} />
            );
          })}
        </OtherIcons>
      )}
    </DropdownWrapper>
  );
};

export default PowerUpDropdown;
