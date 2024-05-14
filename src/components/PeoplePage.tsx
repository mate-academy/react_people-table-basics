import { useEffect, useState } from 'react';

import { Loader } from './Loader';
import PeopleTable from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

type Props = {};
export default function PeoplePage({}: Props) {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchState, setFetchState] = useState<'success' | 'loading' | 'fail'>(
    'loading',
  );

  useEffect(() => {
    getPeople()
      .then((data: Person[]) => {
        setPeople(
          data.map(dataPerson => {
            const newP = dataPerson;
            const f = data.find(
              findPerson => dataPerson.fatherName === findPerson.name,
            );
            const m = data.find(
              findPerson => dataPerson.motherName === findPerson.name,
            );

            if (f) {
              newP.father = f;
            }

            if (m) {
              newP.mother = m;
            }

            return newP;
          }),
        );
        setFetchState('success');
      })
      .catch(() => {
        setFetchState('fail');
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {fetchState === 'loading' ? (
            <Loader />
          ) : fetchState === 'fail' ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
}
