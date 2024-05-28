import { FC } from 'react';
import { Person } from '../types';
import PersonLink from './PersonLink';

interface Props {
  people: Person[];
  isError: boolean;
}

const PeopleTable: FC<Props> = ({ people, isError }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {/* <Loader /> */}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isError && (
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
                <PersonLink key={person.slug} person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PeopleTable;
