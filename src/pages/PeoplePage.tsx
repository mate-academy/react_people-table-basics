import { useEffect, useState } from 'react';
import { PersonList } from '../components/PersonList';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fullPeople, setFullPeople] = useState<Person[]>([]);

  const updateFullPeople = (peopleData: Person[]) => {
    const allPeople = [...peopleData];

    allPeople.forEach((person) => {
      const newPerson = person;

      newPerson.mother = allPeople.find((p) => p.name === newPerson.motherName);
      newPerson.father = allPeople.find((p) => p.name === newPerson.fatherName);
    });

    setFullPeople(allPeople);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople);
        updateFullPeople(fetchedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {!loading && !error && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && <PersonList people={fullPeople} />}
        </div>
      </div>
    </>
  );
};
