import { FC } from 'react';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { PeopleListProps } from '../PeoplePage.types';

export const PeopleList: FC<PeopleListProps> = ({
  people,
  selectedPersonSlug,
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
        {people.map(person => {
          return (
            <PersonInfo
              key={person.slug}
              person={person}
              selectedPersonSlug={selectedPersonSlug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
