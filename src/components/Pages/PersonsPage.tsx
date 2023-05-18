import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';

export const PersonsPage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { slug } = useParams();
  const isSelected = (person: Person) => slug === person.slug;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople();

        const getParent = (parentName: string) => peopleFromServer.find(
          ({ name }) => name === parentName,
        );

        const peopleWithParents = peopleFromServer.map((person) => {
          return {
            ...person,
            mother: getParent(person.motherName || ''),
            father: getParent(person.fatherName || ''),
          };
        });

        setPersons(peopleWithParents);
      } catch {
        setErrorMessage('Something went wrong');
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!persons.length && !errorMessage
            ? ((isLoading && <Loader />) || (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ))
            : (
              <>
                {
                  errorMessage
                    ? (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )
                    : (
                      <table
                        data-cy="peopleTable"
                        className="
                      table is-striped is-hoverable is-narrow is-fullwidth
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
                          {persons.map((person) => {
                            const {
                              sex,
                              born,
                              died,
                              motherName,
                              fatherName,
                              father,
                              mother,
                            } = person;

                            return (
                              <tr
                                data-cy="person"
                                key={person.slug}
                                className={cn({
                                  'has-background-warning':
                                    isSelected(person),
                                })}
                              >
                                <td>
                                  <PersonLink person={person} />
                                </td>

                                <td>{sex}</td>
                                <td>{born}</td>
                                <td>{died}</td>
                                <td>
                                  {mother ? (
                                    <PersonLink person={mother} />
                                  ) : motherName || '-'}
                                </td>
                                <td>
                                  {father ? (
                                    <PersonLink person={father} />
                                  ) : fatherName || '-'}
                                </td>
                              </tr>
                            );
                          })}

                        </tbody>
                      </table>
                    )
                }

              </>
            )}

        </div>
      </div>

    </>
  );
};
