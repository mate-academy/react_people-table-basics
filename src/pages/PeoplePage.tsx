import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Errors } from '../types/Errors';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Errors | null>(null);

  useEffect(() => {
    setError(null);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        if (!peopleFromServer.length) {
          setError(Errors.Empty);
        }
      })
      .catch(() => setError(Errors.Loading));
  }, []);

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error === Errors.Loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {Errors.Loading}
            </p>
          )}

          {error === Errors.Empty && (
            <p data-cy="noPeopleMessage">{Errors.Empty}</p>
          )}

          {!error && !people.length ? (
            <Loader />
          ) : (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
