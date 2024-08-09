import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { slug } = useParams();
  const selectedPerson = slug
    ? people.find(person => person.slug === slug)
    : null;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading ? (
        <Loader />
      ) : (
        <PeopleTable
          people={people}
          selectedPerson={selectedPerson}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};
