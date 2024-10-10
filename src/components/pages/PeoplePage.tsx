import { Loader } from '../Loader';
import { PeopleTable } from '../Loader/PeopleTable';
import { getPeople } from '../services/api';
import { useEffect, useState } from 'react';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleByName: { [key: string]: Person } = {};

        data.forEach(person => (peopleByName[person.name] = person));
        const dataUpdated = data.map(p => {
          return {
            ...p,
            mother: peopleByName[p.motherName || ''],
            father: peopleByName[p.fatherName || ''],
          };
        });

        setPeople(dataUpdated);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : !people.length ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
