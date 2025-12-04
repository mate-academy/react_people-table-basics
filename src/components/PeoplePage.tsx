import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const selectedPerson = people?.find(person => {
    const personSlug = `${person.name.replace(/\s+/g, '-').toLowerCase()}-${person.born}`;

    return personSlug === slug;
  });

  const selectedName = selectedPerson ? selectedPerson.name : null;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && !isLoading && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && !!people?.length && (
            <PeopleTable people={people} selectedName={selectedName} />
          )}
        </div>
      </div>
    </>
  );
};
