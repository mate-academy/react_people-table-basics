import { FC } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { Loader } from '../Loader';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <>
      {people ? (
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
            {people.length > 0
              ? people.map(person => (
                <PersonItem person={person} key={person.slug} />
              )) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}
    </>
  );
};
