import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

type Parent = 'father' | 'mother';

const getParent = (
  people: Person[],
  person: Person,
  parent: Parent,
) => {
  if (parent === 'father') {
    return people.find(({ name }) => name === person.fatherName);
  }

  return people.find(({ name }) => name === person.motherName);
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoadind, setIsLoading] = useState(true);

  const preparePeople = () => {
    setIsLoading(true);

    getPeople().then(result => {
      const prepared = result.map(person => ({
        ...person,
        father: getParent(result, person, 'father'),
        mother: getParent(result, person, 'mother'),
      }));

      setPeople(prepared);
    })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    preparePeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoadind
            ? <Loader />
            : (
              <PeopleTable
                onError={isError}
                people={people}
              />
            )}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
