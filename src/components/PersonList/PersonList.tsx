import { useContext } from 'react';

import { PeopleContext } from '../../context/PeopleContext';

import { PersonItem } from '../PersonItem';

export const PersonList = () => {
  const { people } = useContext(PeopleContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => <PersonItem key={person.slug} person={person} />)}
      </tbody>
    </table>
  );
};
