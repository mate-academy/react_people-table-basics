import { useState, useEffect } from 'react';
import { PersonList } from './PersonList';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch((error) => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleWithParents = people?.map((person) => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return { ...person, mother, father };
  });

  const isNoPeopleMessage = !people.length && !errorMessage && !isLoading;
  const isErrorMessage = errorMessage && !isLoading;
  const isShowPeople = !isLoading && !isErrorMessage && !!people.length;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isNoPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoading && <Loader />}

          {isShowPeople && (
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
                <PersonList
                  people={peopleWithParents}
                />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
