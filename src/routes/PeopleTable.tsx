import React from 'react';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[];
  selectedSlug: string;
  nameToSlugMap: Map<string, string>;
};

const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  nameToSlugMap,
}) => {
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
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            selectedSlug={selectedSlug}
            nameToSlugMap={nameToSlugMap}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
