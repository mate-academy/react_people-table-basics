import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          <div className="container">
            <div className="block">
              <PeopleTable people={people} active={slug} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
