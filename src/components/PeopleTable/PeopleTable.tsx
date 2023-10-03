import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Table } from '../Table/Table';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => setPeople(response))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = () => {
    const prepared = people.map(person => {
      return ({
        ...person,
        mother: people
          .find(p => p.name === person.motherName || null),
        father: people
          .find(p => p.name === person.fatherName || null),
      });
    });

    return prepared;
  };

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
          <Table people={preparedPeople()} />
        )}

      </div>
    </div>
  );
};
