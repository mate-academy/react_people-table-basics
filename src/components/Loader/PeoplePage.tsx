import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonData } from './PersonData';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}
                {people.length
                  ? (
                    <table
                      data-cy="peopleTable"
                      className="table
                      is-striped is-hoverable is-narrow is-fullwidth"
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
                        {people.map((person) => {
                          const mother = people.find(
                            p => p.name === person.motherName,
                          );

                          const father = people.find(
                            p => p.name === person.fatherName,
                          );

                          const personWithParents = {
                            ...person,
                            mother,
                            father,
                          };

                          return (
                            <PersonData person={personWithParents} />
                          );
                        })}
                      </tbody>
                    </table>
                  )
                  : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
              </>
            )}

        </div>
      </div>
    </>
  );
};
