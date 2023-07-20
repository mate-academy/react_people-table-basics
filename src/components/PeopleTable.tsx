import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

type Props = {
  people: Person [];
  isLoading: boolean
};

export const PeopleTable: FC<Props> = ({ people, isLoading }) => {
  const checkingMotherName = (personParentName: string | null) => {
    return personParentName
      ? people.find(person => person.name === personParentName) || null
      : null;
  };

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader /> : (
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
                    person={person}
                    key={person.slug}
                    checkingPersonName={checkingMotherName}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
