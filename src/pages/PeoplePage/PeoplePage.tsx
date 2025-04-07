import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllPersons = async () => {
    setIsLoading(true);

    try {
      const allPersons = await getPeople();

      setPeople(allPersons);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPersons();
  }, []);

  const personsForRender = people?.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!errorMessage &&
            !isLoading &&
            (personsForRender?.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={personsForRender || []} />
            ))}
        </div>
      </div>
    </>
  );
};
