import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(resolve => setPeopleFromServer(resolve))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {errorMessage.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!loading && peopleFromServer?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {peopleFromServer && peopleFromServer.length > 0 && (
            <PeopleTable people={peopleFromServer} />
          )}
        </div>
      </div>
    </>
  );
};
