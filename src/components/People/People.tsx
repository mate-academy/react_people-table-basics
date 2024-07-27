import { Person } from '../../types';
import { Loader } from '../Loader';
import PeopleInfo from './PeopleInfo';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoaded, setIsloaded] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsloaded(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoaded && <Loader />}

          {errorMessage && !isLoaded && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !isLoaded && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !isLoaded && (
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
                  <PeopleInfo
                    key={person.slug}
                    person={person}
                    people={people}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default People;
