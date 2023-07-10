import {
  FC, useMemo, useState, useEffect,
} from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { getPeople } from '../../api';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const isPeoplePresent = people.length > 0;

  const mappedPeople = useMemo(() => people.map(person => {
    const father = people.find(
      possiblyFather => (possiblyFather.name === person.fatherName),
    );

    const mother = people.find(
      possiblyMother => (possiblyMother.name === person.motherName),
    );

    return { ...person, father, mother };
  }), [people]);

  return (
    <div className="block">
      <div className="box table-container">
        {!isLoaded && <Loader />}

        {(isLoaded && isError) && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(isLoaded && !isPeoplePresent) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {isPeoplePresent && (
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
              {mappedPeople.map(person => (
                <PersonItem
                  person={person}
                  key={person.slug}
                />
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
};
