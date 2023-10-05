import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(() => {
    return people.map(person => {
      const mother = people.find(element => element.name === person.motherName);
      const father = people.find(element => element.name === person.fatherName);

      return { ...person, mother, father };
    });
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {!isLoading && people?.length === 0
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {people.length > 0
            && (
              <PeopleTable people={peopleWithParents} />)}
        </div>
      </div>
    </>
  );
};
