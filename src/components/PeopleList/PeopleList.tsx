import React, { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { PeopleItem } from '../PeopleItem';

export const PeopleList: React.FC = () => {
  const { people } = useContext(PeopleContext);

  return (
    <tbody>
      {people?.map(person => <PeopleItem key={person.slug} person={person} />)}
    </tbody>
  );
};
