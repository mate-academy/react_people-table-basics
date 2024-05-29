import { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

type Props = {};

export const PeoplePage: React.FC<Props> = ({}: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchState, setFetchState] = useState<'success' | 'loading' | 'fail'>(
    'loading',
  );

  useEffect(() => {
    getPeople()
      .then((data: Person[]) => {
        const nameToPersonMap = new Map<string, Person>();

        data.forEach(person => {
          nameToPersonMap.set(person.name, person);
        });

        const updatedPeople = data.map(dataPerson => {
          const newPerson = { ...dataPerson };

          const father = nameToPersonMap.get(dataPerson.fatherName || '');
          const mother = nameToPersonMap.get(dataPerson.motherName || '');

          if (father) {
            newPerson.father = father;
          }

          if (mother) {
            newPerson.mother = mother;
          }

          return newPerson;
        });

        setPeople(updatedPeople);
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
};
