import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);

  useEffect(() => {
    setIsDownloading(true);

    getPeople()
      .then(result => {
        if (result.length === 0) {
          setPeopleFromServer([]);

          return;
        }

        setPeopleFromServer(result);
        setIsDownloading(false);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {(isDownloading && !peopleFromServer) && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {peopleFromServer && (
            !peopleFromServer?.length
              ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
              : <PeopleTable peopleFromServer={peopleFromServer} />
          )}
        </div>
      </div>
    </div>
  );
};
