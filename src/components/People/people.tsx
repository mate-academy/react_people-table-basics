import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../Person/Person';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = people.map(person => {
    const newPerson = { ...person };

    if (person.motherName) {
      newPerson.mother = people.find(pers => pers.name === person.motherName);
    }

    if (person.fatherName) {
      newPerson.father = people.find(pers => pers.name === person.fatherName);
    }

    return newPerson;
  });

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading
          && <Loader />}

        {error
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

        {!people.length && !error && !isLoading
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        {(people && !isLoading)
          && (
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
                {!!peopleWithParents.length
                  && peopleWithParents.map(person => {
                    return (
                      <PersonLink person={person} key={person.slug} />
                    );
                  })}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
