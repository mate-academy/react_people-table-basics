import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.LoadingError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const enrichedPeople = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">{ErrorMessage.NoPeople}</p>
          )}

          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable people={enrichedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
