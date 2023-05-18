/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeoplePageList } from '../PeoplePageList/PeoplePageList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const isNoPeopleMessage = !isLoading && !people.length;

  const findParents = (people: Person[]) => {
    return people.map((person) => ({
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    }));
  };

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();
      const preparedPeople = findParents(peopleFromServer);

      setPeople(preparedPeople);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isPeople = !isLoading && people.length;

  return (
    <div className="container">
      <div className="block">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}
          {isPeople && (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              <PeoplePageList people={people} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
