import { usePeopleService } from '../services/usePeopleService';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { Outlet } from 'react-router-dom';

export const PeoplePage = () => {
  const { isLoading, getPeople, isError } = usePeopleService();
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeopleList);
  }, []);

  const loading = isLoading ? <Loader /> : null;
  const error = !isError ? null : (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
  const content = !isLoading ? (
    <Outlet context={{ peopleList, isError }} />
  ) : null;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {loading}
            {error}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};
