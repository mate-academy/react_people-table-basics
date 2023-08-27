import React, { useEffect, useState } from 'react';

import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getParents = (peopleWithParrents: Person[]) => {
    const peopleWithParents = peopleWithParrents.map((person) => {
      const newPerson = { ...person };

      newPerson.father = peopleWithParrents
        .find(father => father.name === newPerson.fatherName);

      newPerson.mother = peopleWithParrents
        .find(mother => mother.name === newPerson.motherName);

      return newPerson;
    });

    return peopleWithParents;
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleData => {
        setPeople(getParents(peopleData));
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const isAnyPerson = people.length > 0;

  const isShow = {
    peopleList: !isLoading && !isError && isAnyPerson,
    noPeopleNotification: !isAnyPerson && !isLoading && !isError,
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isShow.noPeopleNotification && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isShow.peopleList
            && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
