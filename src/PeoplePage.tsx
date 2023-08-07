import React, { memo, useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { Loader } from './components/Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = memo(() => {
  const [users, setUsers] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((data) => {
        setUsers(data);
        setError(false);
      })
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
          {loading ? (
            <Loader />
          ) : (
            <PeopleTable peoples={preparedUsers} error={error} />
          )}
        </div>
      </div>
    </>
  );
});
