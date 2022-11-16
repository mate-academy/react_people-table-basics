import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from './PersonInfo';

interface Props {
  people: Person[];
  selectedSlug: string;
}

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const isSelected = (person: Person) => selectedSlug === person.slug;

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
          <PersonInfo
            person={person}
            key={person.slug}
            isSelected={isSelected(person)}
          />
        ))}
      </tbody>
    </table>
  );
};
