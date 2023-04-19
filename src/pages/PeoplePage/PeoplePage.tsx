import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList';
import { Person } from '../../types/Person';

const getPerson = (people: Person[], name: string) => (
  people.find((person) => person.name === name) || null
);

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isEmptyDataError, setIsEmptyDataError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peoplesFromApi) => {
        if (peoplesFromApi.length === 0) {
          setIsEmptyDataError(true);

          return;
        }

        const peoplesWithParents = peoplesFromApi.map((person) => {
          const currentPerson = { ...person };

          if (person.motherName) {
            currentPerson.mother = getPerson(peoplesFromApi, person.motherName);
          }

          if (person.fatherName) {
            currentPerson.father = getPerson(peoplesFromApi, person.fatherName);
          }

          return currentPerson;
        });

        setPeople(peoplesWithParents);
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isEmptyDataError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong while list of people loading!!
            </p>
          )}

          {isLoading
            ? (
              <Loader />
            ) : (
              <PeopleList people={people} />
            )}
        </div>
      </div>
    </div>
  );
};
