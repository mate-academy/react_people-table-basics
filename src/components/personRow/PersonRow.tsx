import React from 'react';
import { PreperedPerson } from '../../react-app-env';

interface Props {
  person: PreperedPerson,
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <>
      <td>{person.name}</td>
      <th>{person.sex}</th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>{person.motherName?.name || 'Don\'t know her'}</th>
      <th>{person.fatherName?.name || 'Don\'t know him'}</th>
    </>
  );
};
