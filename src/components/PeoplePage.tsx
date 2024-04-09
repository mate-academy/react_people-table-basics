import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { Errors } from '../types/Errors';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Errors | null>(null);

  useEffect(() => {
    setError(null);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        if (peopleFromServer.length === 0) {
          setError(Errors.Empty);
        }
      })
      .catch(() => setError(Errors.Loading));
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(woman => woman.name === person.motherName);
    const father = people.find(man => man.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

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

          {!error && people.length === 0 ? (
            <Loader />
          ) : (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
