import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setTimeout(() => {
          setPeople(data);
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const selectedPerson = people.find(person => person.slug === slug);

  if (!isLoading && !hasError && slug && !selectedPerson) {
    return <h1 className="title">Page not found</h1>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && hasError && people.length === 0 && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <PeopleTable people={people} selectedPerson={selectedPerson} />
      )}
    </>
  );
};
