import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { Table } from '../../components/Table';
import { getPeople } from '../../api';
import { Loading } from '../../types/Loading';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingState, setLoadingState]
    = useState<Loading>(Loading.loading);

  useEffect(() => {
    getPeople()
      .then((res) => {
        setPeople(res);
        setLoadingState(Loading.success);
      })
      .catch(() => setLoadingState(Loading.error));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loadingState === Loading.loading && <Loader />}
          {loadingState === Loading.error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {loadingState === Loading.success && (
            <>
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <Table people={people} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
