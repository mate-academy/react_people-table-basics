import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import type { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

enum LoadStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.Idle);

  useEffect(() => {
    setStatus(LoadStatus.Loading);
    getPeople()
      .then(data => {
        setPeople(data);
        setStatus(LoadStatus.Success);
      })
      .catch(() => setStatus(LoadStatus.Error));
  }, []);

  const isLoading = status === LoadStatus.Loading;
  const isError = status === LoadStatus.Error;
  const isEmpty = status === LoadStatus.Success && people.length === 0;

  return (
    <>
      <h1 className={cn('title')}>People Page</h1>

      <div className={cn('block')}>
        <div className={cn('box', 'table-container')}>
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className={cn('has-text-danger')}>
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !isError && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug ?? null} />
          )}
        </div>
      </div>
    </>
  );
};
