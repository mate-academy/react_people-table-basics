import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleList } from '../PeopleList';

const findParent = (people: Person[], parentName: string | null) => {
  return people.find((person) => person.name === parentName);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newError, setNewError] = useState(false);

  const loadPeople = useCallback(
    async () => {
      try {
        const response = await getPeople();

        const peopleWithParents = response.map((person) => ({
          ...person,
          mother: findParent(response, person.motherName),
          father: findParent(response, person.fatherName),
        }));

        setPeople(peopleWithParents);
      } catch (error) {
        setNewError(true);
      } finally {
        setIsLoading(false);
      }
    }, [],
  );

  useEffect(() => {
    setIsLoading(true);

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {newError
                  && (
                    <p data-cy="peopleLoadingError">
                      Something went wrong
                    </p>
                  )}

                {!people.length && !newError
                  ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )
                  : <PeopleList people={people} />}

              </>
            )}
        </div>
      </div>
    </>
  );
};
