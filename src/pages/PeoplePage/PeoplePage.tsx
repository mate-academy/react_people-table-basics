import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';

import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Loader } from '../../components/Loader';

const getPreparedPeople = (people: Person[]) => {
  let preparedPeople = [...people];

  preparedPeople = preparedPeople.map(person => {
    const father = people.find(parent => parent.name === person.fatherName);
    const mother = people.find(parent => parent.name === person.motherName);

    return { ...person, father, mother };
  });

  return preparedPeople;
};

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const people = getPreparedPeople(peopleFromServer);
  const hasPeopleOnServer = !people.length && !isLoading && !isErrorShowing;

  useEffect(() => {
    getPeople()
      .then(setPeopleFromServer)
      .catch(setIsErrorShowing)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorShowing && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasPeopleOnServer && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
