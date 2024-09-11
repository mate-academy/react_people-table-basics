import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setLoaded(false);

    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(p => ({ ...p }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother: preparedPeople.find(m => m.name === person.motherName),
            father: preparedPeople.find(f => f.name === person.fatherName),
          });
        });

        setPeople(preparedPeople);
      })
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!loaded && <Loader />}

          {loaded && hasError && (
            <p data-cy="peopleLoadingError">Something went wrong</p>
          )}

          {loaded && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {loaded && !hasError && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
