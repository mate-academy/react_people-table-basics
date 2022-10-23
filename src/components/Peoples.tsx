import { FC, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const Peoples: FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const peopleList = await getPeople();
        const peopleWithParents = peopleList.map(person => ({
          ...person,
          mother: peopleList
            .find((personItem) => personItem.name === person.motherName),
          father: peopleList
            .find((personItem) => personItem.name === person.fatherName),
        }));

        setPeople(peopleWithParents);
      } catch (Error) {
        setError(true);
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people && !people?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {people && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
