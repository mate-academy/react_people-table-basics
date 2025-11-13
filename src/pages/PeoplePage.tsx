import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </>
    );
  }

  if (people.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} selectedSlug={slug} />
    </>
  );
};
