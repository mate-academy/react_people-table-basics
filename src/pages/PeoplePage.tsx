import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data: Person[]) => {
        const prepapedPeople = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(prepapedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !hasError && !people.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!!people.length && (
              <PeopleTable people={people} selectedSlug={slug} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
