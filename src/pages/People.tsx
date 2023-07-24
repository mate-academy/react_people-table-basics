import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../components/Loader';

import { getPeople } from '../api';
import { Person } from '../types';

type Props = {
  selectedPerson: string | null,
};

enum ERROR {
  NONE,
  EMPTYARRAY,
  OTHERERROR,
}

export const People: React.FC<Props> = ({ selectedPerson }) => {
  const [error, setError] = useState<ERROR>(ERROR.NONE);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const findMother = (person: Person) => {
    if (person.motherName) {
      return people.find((p) => p.name === person.motherName);
    }

    return undefined;
  };

  const findFather = (person: Person) => {
    if (person.fatherName) {
      return people.find((p) => p.name === person.fatherName);
    }

    return undefined;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await getPeople();

        if (res.length) {
          setPeople(res);
        } else {
          setError(ERROR.EMPTYARRAY);
        }
      } catch (err) {
        setError(ERROR.OTHERERROR);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="block">
        <div className="box table-container">

          {isLoading ? (
            <Loader />
          ) : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              {error === ERROR.OTHERERROR && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
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

                {error === ERROR.EMPTYARRAY && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': selectedPerson === person.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    {findMother(person) ? (
                      <td>
                        <Link
                          to={`${findMother(person)?.slug}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      </td>
                    ) : (
                      <td>{person.motherName || '-'}</td>
                    )}

                    {findFather(person) ? (
                      <td>
                        <Link
                          to={`${findFather(person)?.slug}`}
                        >
                          {person.fatherName}
                        </Link>
                      </td>
                    ) : (
                      <td>{person.fatherName || '-'}</td>
                    )}

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
