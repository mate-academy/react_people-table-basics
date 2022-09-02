import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

const initPeople: Person[] | [] = [];

export const PeoplePage = () => {
  const [people, setPeople] = useState(initPeople);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setHasLoadingError(true))
      .finally(() => {
        setIsPeopleLoading(false);
        setIsData(true);
      });
  }, []);

  const peopleToShow = people.map((person, _, arr) => {
    const personMother = arr
      .find(parent => parent.name === person.motherName) || null;
    const personFather = arr
      .find(parent => parent.name === person.fatherName) || null;

    return ({
      ...person,
      mother: personMother,
      father: personFather,
    });
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && isData && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={peopleToShow} />
          )}
        </div>
      </div>
    </>
  );
};
