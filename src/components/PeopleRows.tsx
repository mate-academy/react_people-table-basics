import React from 'react';

type Props = {
  person: People;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || 'Not given'}</td>
    <td>{person.fatherName || 'Not given'}</td>
  </>
);
