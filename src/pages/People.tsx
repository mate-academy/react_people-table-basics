import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { Table } from '../components/Table';

const peopleToRender = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleToRender(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoading && !people.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
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
                  <Table person={person} key={person.slug} />
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};
