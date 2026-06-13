import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLength, setPeopleLength] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleList => {
        setPeople(peopleList);
        setPeopleLength(peopleList.length);
        setError(false);
      })
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

          {peopleLength === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && <PeopleTable people={people} />}
        </div>
      </div>
    </div>
  );
};
