import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noPeople, setNoPeople] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        if (peopleFromServer.length === 0) {
          setNoPeople(true);
        } else {
          setShowTable(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [people.length]);

  return (
    <>
      {loading && <Loader />}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {noPeople && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {showTable && (
        <div className="block">
          <div className="box table-container">
            <PeopleTable people={people} />
          </div>
        </div>
      )}
    </>
  );
};
