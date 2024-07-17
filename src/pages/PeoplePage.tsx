import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updatedPeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(pers => pers.name === person.motherName),
    father: people.find(pers => pers.name === person.fatherName),
  }));
  // debugger

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isError && !!people.length && (
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

              <PeopleTable people={updatedPeople} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
