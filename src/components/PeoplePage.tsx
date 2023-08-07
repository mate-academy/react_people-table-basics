import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { ErrorNoPeople } from './ErrorNoPeople';
import { ErrorLoading } from './ErrorLoading';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch((newError) => {
        setError(true);
        throw newError;
      })
      .finally(() => setLoading(false));
  }, []);

  const allPeople = useMemo(() => (
    people.map(person => {
      const mother = people.find(findPerson => (
        findPerson.name === person.motherName
      ));

      const father = people.find(findPerson => (
        findPerson.name === person.fatherName
      ));

      return { ...person, mother, father };
    })
  ), [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && <ErrorLoading />}

          {!error && !loading && people.length === 0 && <ErrorNoPeople />}

          {people.length !== 0 && !error
          && <PeopleTable visiblePeople={allPeople} />}

        </div>
      </div>
    </>
  );
};
