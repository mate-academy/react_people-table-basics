/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getAll } from '../../utils/fetchClient';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAll()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = people.map(person => {
    const newPerson = { ...person };

    newPerson.mother = people.find(mother => mother.name === person.motherName);
    newPerson.father = people.find(father => father.name === person.fatherName);

    return newPerson;
  });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : (
              <PeopleTable people={visiblePeople} error={error} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
