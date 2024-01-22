import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PepleTable';

const prepareData = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(
      motherObject => motherObject.name === person.motherName,
    );
    const father = people.find(
      fatherObject => fatherObject.name === person.fatherName,
    );

    const personCopy = {
      ...person,
      mother,
      father,
    };

    return personCopy;
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data) => {
        setPeople(prepareData(data));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const tableVisible = !isLoading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {tableVisible && <PeopleTable people={people} />}

        </div>
      </div>

    </>
  );
};
