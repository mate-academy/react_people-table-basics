import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonItem } from '../components/PersonItem/PersonItem';

const getMother = (people: Person[], motherName: string): Person | null => {
  return people.find(person => person.name === motherName) || null;
};

const getFather = (people: Person[], fatherName: string): Person | null => {
  return people.find(person => person.name === fatherName) || null;
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { personSlug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleArray => peopleArray.map(person => {
        const personCopy = { ...person };

        if (person.motherName) {
          personCopy.mother = getMother(peopleArray, person.motherName);
        }

        if (person.fatherName) {
          personCopy.father = getFather(peopleArray, person.fatherName);
        }

        return personCopy;
      }))
      .then(setPeople)
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isLoadingError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <>
                {people.length <= 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <table
                    data-cy="peopleTable"
                    className={classNames(
                      'table',
                      'is-striped',
                      'is-hoverable',
                      'is-narrow',
                      'is-fullwidth',
                    )}
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
                      {people.map(person => (
                        <PersonItem
                          person={person}
                          selectedPerson={personSlug}
                          key={person.slug}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
