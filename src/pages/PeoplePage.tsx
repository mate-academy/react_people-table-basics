import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const rawPeople = await getPeople();

        const preparedPeople = rawPeople.map((person, _, arr) => ({
          ...person,
          father: arr.find(
            innerPerson => innerPerson.name === person.fatherName,
          ),
          mother: arr.find(
            innerPerson => innerPerson.name === person.motherName,
          ),
        }));

        setPeople(preparedPeople);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'An unexpected error occured during fetch',
        );
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
          {!isLoading && people.length > 0 && <PeopleTable people={people} />}
          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
