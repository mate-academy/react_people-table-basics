import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
// import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';

const findPersonMother = (people: Person[], name: string) => {
  return people.find(person => person.name === name);
};

const findPersonFather = (people: Person[], name: string) => {
  return people.find(person => person.name === name);
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople().then(allPeople => {
      const peopleWithFamily = (): Person[] => {
        return allPeople.map(person => ({
          ...person,
          mother: person.motherName
            ? findPersonMother(allPeople, person.motherName)
            : undefined,
          father: person.fatherName
            ? findPersonFather(allPeople, person.fatherName)
            : undefined,
        }));
      };

      setPeople(peopleWithFamily);
    })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {loading ? (
            <Loader />
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
