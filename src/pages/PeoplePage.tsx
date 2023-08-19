import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

const getPreparedPeople = (people: Person[]) => {
  return people.map((person) => {
    const mother = people.find((mom) => mom.name === person.motherName);
    const father = people.find((dad) => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((res) => setUsers(getPreparedPeople(res)))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!users.length && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        <PeopleTable people={users} />
      </div>
    </>
  );
};
