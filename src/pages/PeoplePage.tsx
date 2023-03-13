import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const { slug } = useParams();

  const getParents = (loadedPeople: Person[], currentPerson: Person) => {
    const mother = loadedPeople.find(
      (person: Person) => currentPerson.motherName === person.name,
    );
    const father = loadedPeople.find(
      (person: Person) => currentPerson.fatherName === person.name,
    );

    return {
      ...currentPerson,
      mother,
      father,
    };
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(loadedPeople => {
        const formatedPeople = loadedPeople
          .map(currentPerson => getParents(loadedPeople, currentPerson));

        setPeople(formatedPeople);
      })
      .catch(() => setIsErrorLoading(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          { people && !people.length && !isLoading && !isErrorLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people
            && !!people.length
            && <PeopleTable people={people} slug={slug} />}

        </div>
      </div>
    </>
  );
};
