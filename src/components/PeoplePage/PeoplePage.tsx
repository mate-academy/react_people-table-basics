import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </div>
  );
};
