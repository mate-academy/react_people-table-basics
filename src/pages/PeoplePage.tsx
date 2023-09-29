import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { getPersonFather, getPersonMother } from '../utills/getParentsFuncts';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer.map(personInfo => {
          const father = getPersonFather(peopleFromServer, personInfo);
          const mother = getPersonMother(peopleFromServer, personInfo);
          const currentPerson = { ...personInfo, father, mother };

          return currentPerson;
        }));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isNoPeople = !people.length && !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading
        ? <Loader />
        : <PeopleTable people={people} />}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {isNoPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
