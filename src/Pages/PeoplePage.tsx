import { useState, useEffect } from 'react';
import { getPeople } from '../components/api/api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [processing, setProccesing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProccesing(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setProccesing(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {processing && (<Loader />)}

        {error && (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        )}

        {!processing && !people.length && !error && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!processing && people.length && (
          <PeopleTable
            people={people}
          />
        )}
      </div>
    </div>
  );
};
