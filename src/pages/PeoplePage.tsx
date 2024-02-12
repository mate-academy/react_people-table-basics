import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const correctPeople = people.map(person => {
    const newPerson = { ...person };

    newPerson.father = people
      .find(elem => elem.name === newPerson.fatherName) || undefined;

    newPerson.mother = people
      .find(elem => elem.name === newPerson.motherName) || undefined;

    return newPerson;
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (<PeopleList people={correctPeople} />)}
        </div>
      </div>
    </div>
  );
};
