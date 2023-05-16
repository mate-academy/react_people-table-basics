// eslint-disable-next-line object-curly-newline
import { FC, useCallback, useEffect, useState } from 'react';
import { Person } from '../../types';
import { fetchPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  const getPeople = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const peopleFromServer = await fetchPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeople();
  }, []);

  const getPerent = (parentName: string | null) => {
    if (parentName) {
      return people?.find(person => person.name === parentName);
    }

    return null;
  };

  const peopleWithPerents = people ? people.map((person) => {
    return {
      ...person,
      mother: getPerent(person.motherName),
      father: getPerent(person.fatherName),
    };
  }) : [];

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && (<PeopleTable people={peopleWithPerents} />)}
        </div>
      </div>
    </>
  );
};
