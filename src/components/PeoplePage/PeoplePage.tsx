import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const NO_PEOPLE_CONDITION
    = !errorMessage && !people.length && !isLoading;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(({ name }) => person.motherName === name);
    const father = people.find(({ name }) => person.fatherName === name);

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

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {NO_PEOPLE_CONDITION && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          <>
            {!!preparedPeople.length && (
              <PeopleTable people={preparedPeople} />
            )}
          </>
        </div>
      </div>
    </>
  );
};
