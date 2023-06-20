import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { ErrorTypes } from '../../enum/ErrorTypes';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorTypes>(ErrorTypes.None);
  const [showTable, setShowTable] = useState(false);

  const loadPeople = async () => {
    try {
      setLoading(true);
      setError(ErrorTypes.None);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
      })));

      if (!peopleFromServer) {
        setError(ErrorTypes.Empty);
      }

      setShowTable(true);
    } catch {
      setError(ErrorTypes.Load);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error === ErrorTypes.Load && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {error === ErrorTypes.Empty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {showTable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
