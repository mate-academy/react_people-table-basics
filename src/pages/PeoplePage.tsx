import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

const peopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => setPeople(peopleWithParents(data)))
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading
            ? <Loader />
            : (
              <>
                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {people.length === 0 && !error && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {people.length > 0 && !error && (
                  <PeopleTable people={people} />
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
