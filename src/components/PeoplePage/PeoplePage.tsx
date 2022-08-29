import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [loadedPeople, setLoadedPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  const { id = '' } = useParams();

  const loadPeople = () => {
    setLoading(true);
    getPeople().then(people => {
      if (people.length > 0) {
        setLoadedPeople(people);
      } else {
        setError(true);
      }
    })
      .finally(() => {
        setLoading(false);
        setRequestStatus(true);
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {loading && <Loader />}
      {requestStatus && <PeopleTable people={loadedPeople} slug={id} />}
    </>
  );
};
