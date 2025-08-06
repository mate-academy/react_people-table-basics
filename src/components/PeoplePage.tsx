import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );
        const data: Person[] = await response.json();

        const peopleWithParents = data.map((person: Person) => ({
          ...person,
          mother: data.find(p => p.name === person.motherName) || undefined,
          father: data.find(p => p.name === person.fatherName) || undefined,
        }));

        setPeople(peopleWithParents);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
