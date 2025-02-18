import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const preparedPeople = (peopleData: Person[]) => {
    return peopleData.map(person => ({
      ...person,
      mother: peopleData.find(per => per.name === person.motherName),
      father: peopleData.find(per => per.name === person.fatherName),
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(preparedPeople(data));
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
