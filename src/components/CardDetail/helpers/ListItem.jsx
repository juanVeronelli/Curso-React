import React, { useState } from 'react';

const ListItem = ({ keySize, isActive, handleClick }) => {

  return (
    <>
      <li className={isActive ? 'active' : ''} onClick={handleClick}>
        {keySize}
      </li>
    </>
  );
};

export default ListItem