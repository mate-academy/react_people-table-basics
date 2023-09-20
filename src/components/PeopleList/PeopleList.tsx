import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

type Props = {};

export const PeopleList: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoadingErrorShown, setIsLoadingErrorShown] = useState(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((persons) => {
        const preparedPeople: Person[] = persons.map((person: Person) => ({
          ...person,
          mother: persons.find(({ sex, name }: Person) => sex === 'f'
            && name === person.motherName),
          father: persons.find(({ sex, name }: Person) => sex === 'm'
            && name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setIsLoadingErrorShown(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {(!isLoadingErrorShown && !!people.length) && (
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
                  {people.map((person) => {
                    const isFemale = person.sex === 'f';

                    return (
                      <tr
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': person.slug === personSlug,
                        })}
                      >
                        <td>
                          <Link
                            to={person.slug}
                            className={classNames({
                              'has-text-danger': isFemale,
                            })}
                          >
                            {person.name}
                          </Link>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.mother ? (
                            <Link
                              to={`${person.mother.slug}`}
                              replace
                              className="has-text-danger"
                            >
                              {person.motherName}
                            </Link>
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>
                        <td>
                          {person.father ? (
                            <Link to={`${person.father.slug}`}>
                              {person.fatherName}
                            </Link>
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
        {isLoadingErrorShown && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!people.length && !isLoadingErrorShown && !isLoading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
