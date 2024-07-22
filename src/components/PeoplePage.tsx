import { useState, useEffect } from 'react';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading && <Loader />}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!loading && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!loading && people.length > 0 && (
        <PeopleTable people={people} selectedPersonSlug={slug || ''} />
      )}
    </>
  );
};
