import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleList } from '../../PeopleList/PeopleList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
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
          {!people?.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorMessage && !!people?.length && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
