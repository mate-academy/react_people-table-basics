import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const fetchPeople = () => {
    getPeople()
      .then((fetchedPeople) => {
        const peopleWithParents = fetchedPeople.map(person => {
          const father = fetchedPeople.find(personFather => (
            personFather.name === person.fatherName
          ));

          const mother = fetchedPeople.find(personMother => (
            personMother.name === person.motherName
          ));

          return { ...person, father, mother };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setIsLoadingError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && !isLoadingError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (<PeopleTable people={people} />)}

        </div>
      </div>
    </>
  );
};
