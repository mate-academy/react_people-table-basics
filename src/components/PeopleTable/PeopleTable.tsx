/* eslint-disable no-console */

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type PeopleListPros = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleListPros) => {
  const listWithParents = people.map(person => ({
    ...person,
    mother: people.find(item => item.name === person.motherName),
    father: people.find(item => item.name === person.fatherName),
  }));

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
        {listWithParents.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
