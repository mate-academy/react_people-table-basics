import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

function fillByParents(persons: Person[]): Person[] {
  return persons.map(person => {
    return {
      ...person,
      father: persons.find(p => p.name === person.fatherName),
      mother: persons.find(p => p.name === person.motherName),
    };
  });
}

export default function PeoplePage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => {
        const fillData = fillByParents(data);

        setPersons(fillData);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : persons.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable persons={persons} />
          )}
        </div>
      </div>
    </>
  );
}
