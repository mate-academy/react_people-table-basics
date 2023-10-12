import { useEffect, useState } from 'react';
import { ErrorOption, Person } from '../types';
import { PeoplePageContent } from './PeoplePageContent';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOption, setErrorOption] = useState(ErrorOption.noError);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then((response) => response.json())
      .then((data) => {
        if (!data.length) {
          setErrorOption(ErrorOption.Empty);
        }

        setPeople(data);
      })
      .catch(() => setErrorOption(ErrorOption.Wrong))
      .finally(() => setIsLoading(false));
  }, []);

  const getParentLink = (parentName: string) => {
    return people.find((person) => person.name === parentName);
  };

  return (
    <>
      {people.map((person) => (
        <p>{person.mother?.slug}</p>
      ))}
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && errorOption === ErrorOption.noError && <Loader />}
          {!isLoading && errorOption === ErrorOption.noError && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>
                {people.length
                && people.map((person) => (
                  <PeoplePageContent
                    key={person.slug}
                    person={person}
                    getParentLink={getParentLink}
                  />
                ))}
              </tbody>
            </table>
          )}

          {errorOption === ErrorOption.Empty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {errorOption === ErrorOption.Wrong && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
