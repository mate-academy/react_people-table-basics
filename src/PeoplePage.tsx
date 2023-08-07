import { FC, useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { getPeople } from './api';
import { Person } from './types';
import { Loader } from './components/Loader';

export const PeoplePage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setUsers)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const preparedUsers = users.map((user) => {
    const newUser = { ...user };

    newUser.mother = users.find((person) => person.name === user.motherName);
    newUser.father = users.find((person) => person.name === user.fatherName);

    return newUser;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) }
          {!loading && !error && (
            <PeopleTable
              peoples={preparedUsers}
            />
          )}
        </div>
      </div>
    </>
  );
};
