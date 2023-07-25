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

  const findParent = (person: Person, parent: string) => {
    if (parent === 'f' && person.motherName) {
      return people.find((p) => p.name === person.motherName);
    }

    if (parent === 'm' && person.fatherName) {
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

              {error === ERROR.EMPTYARRAY && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <tbody>

                {people.map(person => {
                  const mother = findParent(person, 'f');
                  const father = findParent(person, 'm');
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                  } = person;

                  return (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': selectedPerson === slug,
                      })}
                    >
                      <td>
                        <Link
                          to={`${slug}`}
                          className={classNames({
                            'has-text-danger': sex === 'f',
                          })}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      {mother ? (
                        <td>
                          <Link
                            to={`${mother.slug}`}
                            className="has-text-danger"
                          >
                            {motherName}
                          </Link>
                        </td>
                      ) : (
                        <td>{motherName || '-'}</td>
                      )}

                      {father ? (
                        <td>
                          <Link
                            to={`${father.slug}`}
                          >
                            {fatherName}
                          </Link>
                        </td>
                      ) : (
                        <td>{fatherName || '-'}</td>
                      )}

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
