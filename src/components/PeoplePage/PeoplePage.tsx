import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { selectedSlug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const hasNoPeople = !peopleFromServer.length && !error && !loading;
  const hasPeople = peopleFromServer.length > 0 && !error && !loading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {hasPeople && (
            <PeopleTable
              people={peopleFromServer}
              selectedSlug={selectedSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
