import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  // Fetch people, it should be... fine?
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeopleList)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable peopleList={peopleList} loading={loading} hasError={error} />
      <Outlet />
    </>
  );
};
