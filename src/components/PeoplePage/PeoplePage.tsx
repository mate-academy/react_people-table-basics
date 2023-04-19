import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';

function getPersonByName(
  people: Person[],
  personName: string,
): Person | undefined {
  return people.find(({ name }) => name === personName);
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug: selectedSlug } = useParams();

  const getPeopleFromServer = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await getPeople();

      const modifiedPeople = result.map(person => {
        const {
          motherName,
          fatherName,
        } = person;
        const modifiedPerson = { ...person };

        if (!motherName) {
          modifiedPerson.motherName = '-';
        } else {
          modifiedPerson.mother = getPersonByName(result, motherName);
        }

        if (!fatherName) {
          modifiedPerson.fatherName = '-';
        } else {
          modifiedPerson.father = getPersonByName(result, fatherName);
        }

        return modifiedPerson;
      });

      setPeople(modifiedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && people.length > 0 && (
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
                {people.map(person => {
                  const {
                    slug,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    father,
                    mother,
                  } = person;

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': selectedSlug === slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {mother
                          ? <PersonLink person={mother} />
                          : motherName}
                      </td>
                      <td>
                        {father
                          ? <PersonLink person={father} />
                          : fatherName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
};
