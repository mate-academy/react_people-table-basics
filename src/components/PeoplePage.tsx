import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from '../components/Loader/Loader';

export const PeoplePage = () => {
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
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
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
