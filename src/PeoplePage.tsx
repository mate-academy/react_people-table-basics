import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Loader } from './components/Loader';
import { Person } from './types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const { slugId } = useParams();

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(arr => {
        if (arr.length === 0) {
          setIsEmpty(true);
        }

        setPeople(arr);
        setIsLoader(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isEmpty && !isError && !isLoader && (
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
                {people.map(
                  (
                    { name, sex, born, died, fatherName, motherName, slug },
                    index,
                    array,
                  ) => {
                    const mother = array.find(
                      person => person.name === motherName,
                    );

                    const father = array.find(
                      person => person.name === fatherName,
                    );

                    return (
                      <tr
                        key={index}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': slug === slugId,
                        })}
                      >
                        <td>
                          <a
                            className={classNames({
                              'has-text-danger': sex === 'f',
                            })}
                            href={`#/people/${slug}`}
                          >
                            {name}
                          </a>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>
                          {mother ? (
                            <a
                              className={classNames({
                                'has-text-danger': mother.sex === 'f',
                              })}
                              href={`#/people/${mother.slug}`}
                            >
                              {motherName}
                            </a>
                          ) : (
                            motherName || '-'
                          )}
                        </td>
                        <td>
                          {father ? (
                            <a href={`#/people/${father.slug}`}>{fatherName}</a>
                          ) : (
                            fatherName || '-'
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
