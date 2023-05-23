import { FC } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
  isLoading: boolean;
}

export const PeopleTable: FC<Props> = ({ people, isLoading }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {isLoading
          ? (<Loader />)
          : (
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
                {people.map((person) => (
                  <PersonInfo person={person} key={person.slug} />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
