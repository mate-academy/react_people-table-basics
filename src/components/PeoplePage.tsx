import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setIsLoading(false);

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
      .finally(() => setIsLoading(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isLoading && <Loader />}

          {isLoading && hasError && (
            <p data-cy="peopleLoadingError">Something went wrong</p>
          )}

           {isLoading && !hasError && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

           {isLoading && !hasError && !!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
