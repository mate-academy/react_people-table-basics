import { FC } from 'react';
import classnames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
  personSlug?: string;
  isError?: boolean;
}

export const PeopleList:FC<Props> = ({
  people,
  personSlug,
  isError,
}) => {
  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
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
          <tr
            key={person.slug}
            data-cy="person"
            className={classnames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <PersonLink
              person={person}
              people={people}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
