import { useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleContext } from '../Contexts/PeopleContext';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (people.length === 0) {
      setLoading(true);
      getPeople()
        .then(data => {
          setPeople(data);
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }
  }, [people.length, setPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading && <Loader />}

        <div className="block">
          {!loading && !!people.length && <PeopleTable people={people} />}

          {!loading && !errorMessage && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
