import React, { useEffect } from 'react';
import { Loader } from './components/Loader';
import './App.scss';
import { getPeople } from './api';
import PeopleTable from './PeopleTable';
import { Person } from './types';

const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : loadingError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
