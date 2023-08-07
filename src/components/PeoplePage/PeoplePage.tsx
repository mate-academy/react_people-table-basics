import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = useMemo(() => (
    people.map(person => {
      const mother = people.find(findPerson => (
        findPerson.name === person.motherName
      ));

      const father = people.find(findPerson => (
        findPerson.name === person.fatherName
      ));

      return { ...person, mother, father };
    })
  ), [people]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!!error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && preparedPeople.length !== 0 && (
            <PeopleTable people={preparedPeople} />
          )}

          {!isLoading && !error && !preparedPeople.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
