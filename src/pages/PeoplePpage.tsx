import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleLoadingError } from '../components/PeopleLoadingError';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peoplesFromServer, setPeoplesFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeoplesFromServer(people);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && <PeopleLoadingError />}

      {!isLoading && peoplesFromServer.length === 0 && !hasError && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && peoplesFromServer.length > 0 && (
        <PeopleTable
          peoplesFromServer={peoplesFromServer}
          selectedSlug={slug}
        />
      )}
    </div>
  );
};
