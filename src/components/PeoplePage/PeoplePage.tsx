import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { LoadingStatus } from '../../types/LoadingStatus';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus.NONE,
  );

  const fetchPeople = useCallback(async () => {
    setLoadingStatus(LoadingStatus.ISLOADING);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);

      if (peopleFromServer) {
        setLoadingStatus(LoadingStatus.SUCCESS);
      }
    } catch {
      setLoadingStatus(LoadingStatus.ERROR);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  const isLoading = loadingStatus === LoadingStatus.ISLOADING;
  const hasError = loadingStatus === LoadingStatus.ERROR;
  const loadingSuccess = loadingStatus === LoadingStatus.SUCCESS;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {loadingSuccess && (
            <PeopleTable
              people={people}
              personSlug={slug}
            />
          )}
        </div>
      </div>
    </>
  );
};
