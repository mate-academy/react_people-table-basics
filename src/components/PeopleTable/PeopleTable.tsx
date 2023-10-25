import React from 'react';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonProperties } from '../PersonProperties/PersonProperties';

type Props = {
  people: Person[],
  isLoading: boolean,
  selectPeopleSlug: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  selectPeopleSlug,
}) => {
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
                {people.map(person => (
                  <PersonProperties
                    person={person}
                    key={person.slug}
                    selectPeopleSlug={selectPeopleSlug}
                    people={people}
                  />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
