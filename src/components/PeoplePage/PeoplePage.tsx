import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug } = useParams();

  const selectedSlug = personSlug || '';

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getPeople()
      .then(persons => setPeople(persons))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isParent = (person: Person, parentKey: 'motherName' | 'fatherName') => {
    const parentName = person[parentKey];

    return people.some(p => p.name === parentName);
  };

  const getParent = (personName: string) => {
    return people.find(p => p.name === personName);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth
                  "
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
                    {people.map((person, index) => (
                      <tr
                        data-cy="person"
                        key={index}
                        className={
                          selectedSlug === person.slug
                            ? 'has-background-warning'
                            : ''
                        }
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.motherName ? (
                            isParent(person, 'motherName') ? (
                              getParent(person.motherName) ? (
                                <PersonLink
                                  person={getParent(person.motherName)!}
                                />
                              ) : (
                                person.motherName
                              )
                            ) : (
                              person.motherName
                            )
                          ) : (
                            '-'
                          )}
                        </td>

                        <td>
                          {person.fatherName ? (
                            isParent(person, 'fatherName') ? (
                              getParent(person.fatherName) ? (
                                <PersonLink
                                  person={getParent(person.fatherName)!}
                                />
                              ) : (
                                person.fatherName
                              )
                            ) : (
                              person.fatherName
                            )
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
