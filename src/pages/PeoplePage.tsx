import { useEffect, useState } from 'react';
import { Loader } from '../components';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';

const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(false);

    fetch(BASE_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network error');
        }

        return res.json();
      })
      .then((data: Person[]) => {
        const peopleMap = new Map<string, Person>();

        data.forEach(p => peopleMap.set(p.name, p));

        const enrichedPeople = data.map(person => {
          const mother = person.motherName
            ? peopleMap.get(person.motherName)
            : undefined;

          const father = person.fatherName
            ? peopleMap.get(person.fatherName)
            : undefined;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(enrichedPeople);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
