import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonItem } from '../../Person/PersonItem';

export const PeoplesPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noPeople, setNoPeople] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople()
      .then(result => {
        if (result.length === 0) {
          setNoPeople(true);

          return;
        }

        const peopleWithParents = result.map(person => {
          return {
            ...person,
            mother: result.find(item => item.name === person.motherName),
            father: result.find(item => item.name === person.fatherName),
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
          {!isLoading && !isError && (
            <>
              {noPeople ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
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
                      <PersonItem person={person} key={person.name} />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
