import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [peopleIsLoading, setPeopleIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setPeopleIsLoading(true);
    setError('');

    getPeople()
      .then(response => {
        return response.map(person => ({
          ...person,
          mother: response.find(mother => mother.name === person.motherName),
          father: response.find(father => father.name === person.fatherName),
        }));
      })
      .then(setPeople)
      .catch(err => {
        setError(err?.message ?? String(err));
      })
      .finally(() => {
        setPeopleIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peopleIsLoading && <Loader />}

          {!peopleIsLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!peopleIsLoading && !error && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!peopleIsLoading && !error && people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
