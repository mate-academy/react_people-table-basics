import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLine } from '../PersonsLine';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .then(() => setLoader(false))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {loader ? (
              <Loader />
            ) : (
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
                    <PersonLine
                      person={person}
                      people={people}
                      key={person.name}
                    />
                  ))}
                </tbody>
              </table>
            )}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!people.length && !loader && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
