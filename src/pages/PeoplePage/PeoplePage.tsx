import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../../types/Person';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load people');
          }

          return response.json();
        })
        .then((data: Person[]) => {
          const peopleWithParents = data.map(person => ({
            ...person,
            mother: data.find(per => per.name === person.motherName),
            father: data.find(per => per.name === person.fatherName),
          }));

          setHasError(false);
          setPeople(peopleWithParents);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && hasError && (
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
