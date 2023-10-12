import { useContext } from 'react';

import { PeopleProvider } from '../../store/PeopleContext';
import { TableItem } from '../TableItem';

export const TableList = () => {
  const { people } = useContext(PeopleProvider);

  return (
    <tbody>
      {people.map(person => (
        <TableItem
          people={people}
          key={person.slug}
          person={person}
        />
      ))}
    </tbody>
  );
};
