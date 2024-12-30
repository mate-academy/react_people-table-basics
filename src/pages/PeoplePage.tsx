import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loadPeople, setLoadPeople] = useState(false);

  useEffect(() => {
    setLoadPeople(true);
    getPeople()
      .then(res => {
        setPeople(res);
        setError(false);
        setLoadPeople(false);
      })
      .catch(() => {
        setError(true);
        setLoadPeople(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              {loadPeople ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
