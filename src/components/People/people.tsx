import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import '../../App.scss';

import { PeopleTable } from '../PeopleTable/PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!loading && people && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people.length > 0 && (
            <PeopleTable people={people} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};
