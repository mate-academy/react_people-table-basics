import React, { useContext } from 'react';
import { PeopleContext } from '../../PeopleContext';
import { PeopleItem } from '../PeopleItem/PeopleItem';

export const PeopleList: React.FC = () => {
  const { persons } = useContext(PeopleContext);

  return (
    <tbody>
      {persons.map((person) => (
        <PeopleItem person={person} />
      ))}
    </tbody>
  );
};
