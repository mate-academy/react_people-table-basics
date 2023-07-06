import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonItem } from '../PersonItem/PersonItem';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(m => m.name === person.motherName);
    const father = people.find(f => f.name === person.fatherName);

    return { ...person, mother, father };
  });

  const isVisibleErrorNoPeople = (preparedPeople.length === 0
    && !isError
    && !isLoading);
  const isVisiblePeopleTable = (preparedPeople.length > 0);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

        {isVisibleErrorNoPeople
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        {isVisiblePeopleTable
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
                {preparedPeople.map(person => (
                  <PersonItem key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
