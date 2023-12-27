import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { ErrorMessages } from '../../types/ErrorMessages';

interface Props {
  people: Person[],
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const isPeopleEmpty = people.length > 0;

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
        {!isPeopleEmpty ? (
          <p data-cy="noPeopleMessage">{ErrorMessages.EMPTY_PEOPLE}</p>
        ) : (
          <>
            {people.map((person) => (
              <PersonLink person={person} key={person.slug} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
