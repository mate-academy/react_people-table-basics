/* eslint-disable react/prop-types */

import React from 'react';

export const PersonRow = (props) => {
  const {
    name, sex,
    born, died,
    mother, father,
    motherName, fatherName,
  } = props.person;

  const displayParent = (parentType, parentObj) => {
    if (parentObj) {
      return `✅ ${parentObj.name}`;
    }

    if (parentType === 'mother' && motherName) {
      return `❌ ${motherName}`;
    }

    if ((parentType === 'father' && fatherName)) {
      return `❌ ${fatherName}`;
    }

    return '---';
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{displayParent('mother', mother)}</td>
      <td>{displayParent('father', father)}</td>
    </tr>
  );
};
