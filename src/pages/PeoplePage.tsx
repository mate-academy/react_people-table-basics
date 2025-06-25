import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

type ExtendedPerson = Person & {
  motherObject: Person | null;
  fatherObject: Person | null;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<ExtendedPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map((person, _, arr) => ({
        ...person,
        motherObject: arr.find(p => p.name === person.motherName) || null,
        fatherObject: arr.find(p => p.name === person.fatherName) || null,
      }));

      setPeople(preparedPeople);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
