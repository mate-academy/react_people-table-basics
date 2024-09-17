import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

function getPeopleWithParents(people: Person[]) {
  return people.map(person => ({
    ...person,
    father:
      people.find(father => person.fatherName === father.name) || person.father,
    mother:
      people.find(mother => person.motherName === mother.name) || person.mother,
  }));
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    setError(false);
    setDataFetched(false);

    getPeople()
      .then(response => {
        setPeople(getPeopleWithParents(response));
        setDataFetched(true);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!dataFetched && !error && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {dataFetched && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {dataFetched && people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
