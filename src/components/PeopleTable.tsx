import { FC, useState } from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState('');

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
          <PersonItem
            key={person.slug}
            person={person}
            isSelected={selectedSlug === person.slug}
            setSelectedSlug={setSelectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
