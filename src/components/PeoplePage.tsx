import { useState, useEffect } from 'react';
import { getPeopleFromServer } from '../api/api';
import { PeopleTable } from './PersonTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPeople = async () => {
      try {
        const peopleFromServer: Person[] = await getPeopleFromServer();

        setPeople(peopleFromServer);
        setHasError(false);
      } catch (error) {
        setHasError(true);
      }
    };

    getPeople();
  }, []);

  return (
    <div>
      <h2 className="subtitle is-3">People Page</h2>
      {hasError && (
        <p className="error-message">
          Some propblems with server. Please wait.
        </p>
      )}

      {people && <PeopleTable people={people} />}
    </div>
  );
};
