import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { Persona } from './Persona';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoader(true);

    const fetchPeople = () => {
      getPeople()
        .then(peopleList => {
          setPeople(peopleList);
          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoader(false);
        });
    };
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {isError && !isLoader && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0 && !isError && !isLoader && (
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
                {people.map(peopl => (
                  <Persona peopl={peopl} people={people} key={peopl.slug} />
                ))}
              </tbody>
            </table>
          )}
          {people.length === 0 && !isError && !isLoader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
      ;
    </>
  );
};
