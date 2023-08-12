import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonTableRow } from './PersonTableRow';

const PeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName) || null;
    const father = people.find(p => p.name === person.fatherName) || null;

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPeople = async (): Promise<Person[]> => {
    try {
      setIsLoading(true);
      const peopleData = await getPeople();

      setIsError(false);

      return peopleData;
    } catch (error) {
      setIsError(true);

      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople().then(setPeople);
  }, []);

  const preparedPeople = useMemo(() => PeopleWithParents(people), [people]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {preparedPeople.map(person => (
                <PersonTableRow key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
