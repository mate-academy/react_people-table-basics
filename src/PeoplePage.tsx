import { useEffect, useState } from 'react';

import { Person } from './types/Person';
import { getPeople } from './api';
import { Loader } from './components/Loader';
import { NoPeople } from './NoPeople';
import { NotFound } from './NotFound';
import { TablePeople } from './components/TablePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [newError, setNewError] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setLoad(true);
        setPeople(peopleFromServer);
      })
      .catch((error) => {
        setNewError(true);
        throw error;
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {load ? (
          <Loader />
        ) : (
          <>
            {newError && (
              <NotFound />
            )}

            {people.length === 0 && !load && (
              <NoPeople />
            )}

            <TablePeople people={people} />
          </>
        )}
      </div>
    </div>
  );
};
