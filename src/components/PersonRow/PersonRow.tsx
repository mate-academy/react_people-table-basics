import React from 'react';

interface Props {
  people: People
}

export const PersonRow: React.FC<Props> = ({ people }) => (
  <tr>
    <td>{people.name}</td>
    <td>{people.sex}</td>
    <td>{people.born}</td>
    <td>{people.died}</td>
    <td>{people.motherName}</td>
    <td>{people.fatherName}</td>
  </tr>
);
