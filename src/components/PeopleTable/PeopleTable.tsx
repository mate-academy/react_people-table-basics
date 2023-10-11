import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Table } from '../Table/Table';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((response) => {
        const foundParents = response.map((person) => ({
          ...person,
          mother: response
            .find(human => human.name === human.motherName || null),
          father: response
            .find(human => human.name === human.fatherName || null),
        }));

        setPeople(foundParents);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !isError && !people.length && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!isLoading && !isError && !!people.length && (
          <Table people={people} />
        )}

      </div>
    </div>
  );
};
