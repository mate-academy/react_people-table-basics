import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(resp => {
        setPeople(resp);
      })
      .catch(() => {
        setError('Something went wrong');
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
          {loading && <Loader />}
          {error.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {!loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people.length !== 0 && <PeopleTable people={people} slug={slug} />}
        </div>
      </div>
    </>
  );
};
