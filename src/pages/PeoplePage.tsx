import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { People } from '../components/People/People';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [peopleError, setPeopleError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingPeople(true);
    setPeopleError(null);

    getPeople()
      .then(setPeople)
      .catch(() => setPeopleError('Something went wrong'))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {isLoadingPeople && <Loader />}

        {peopleError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoadingPeople && !peopleError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
          <People people={people} />
        )}
      </div>
    </div>
  );
};
