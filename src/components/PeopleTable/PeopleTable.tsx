import { FC } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const isNoPeopleOnServer = people.length === 0;

  if (isNoPeopleOnServer) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

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
            people={people}
            person={person}
            key={person.slug}
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
