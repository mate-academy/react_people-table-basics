import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { PeopleList } from '../../components/PeopleList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadTodos = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople.map(person => ({
        ...person,
        mother: loadedPeople.find(parent => parent.name === person.motherName),
        father: loadedPeople.find(parent => parent.name === person.fatherName),
      })));
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isError && people.length && (
                <PeopleList people={people} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
