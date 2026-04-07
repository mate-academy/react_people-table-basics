import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getPeople()
      .then(data => {
        const preparedPeople = data.map(person => ({
          ...person,
          mother: data.find(onePerson => onePerson.name === person.motherName),
          father: data.find(onePerson => onePerson.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {people.length !== 0 && !hasError && !isLoading && (
        <PeopleTable people={people} selectedSlug={slug} />
      )}
    </>
  );
};
