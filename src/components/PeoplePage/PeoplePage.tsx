import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleList';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer.find(personToFind => {
              return person.motherName === personToFind.name;
            }),
            father: peopleFromServer.find(personToFind => {
              return person.fatherName === personToFind.name;
            }),
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="box table-container">
              <Loader />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {!isError ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
