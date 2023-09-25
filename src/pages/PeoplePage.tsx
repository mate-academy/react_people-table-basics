import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getFatherPerson, getMotherPerson } from '../utils/utils';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorHappened, setIsErrorHappened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(
          peopleFromServer.map((personData) => {
            const mother = getMotherPerson(
              peopleFromServer, personData,
            );
            const father = getFatherPerson(
              peopleFromServer, personData,
            );

            const person: Person = {
              ...personData,
              mother,
              father,
            };

            return person;
          }),
        );
      })
      .catch(() => setIsErrorHappened(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isPeopleNotExist = !isLoading && !isErrorHappened && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorHappened && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleNotExist && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
