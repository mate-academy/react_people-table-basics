import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

import { PeopleTable } from '../components/PepopleTable';

export const PepoplePage: React.FC = () => {
  const [isNoPeopleOnServer, setIsNoPeopleOnServer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  useEffect(() => {
    setIsDownloading(true);

    getPeople()
      .then(result => {
        if (result.length === 0) {
          setIsNoPeopleOnServer(true);
          setIsDownloading(false);

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
          {isDownloading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isNoPeopleOnServer
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : (peopleFromServer?.length !== 0 && (
              <PeopleTable peopleFromServer={peopleFromServer} />
            ))}
        </div>
      </div>
    </div>
  );
};
