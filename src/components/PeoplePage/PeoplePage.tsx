/* eslint-disable no-nested-ternary */
import { Link, NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((allPeople) => {
        const resultPeople = allPeople.map((elem) => {
          const father = allPeople.find(a => a.name === elem.fatherName);
          const mother = allPeople.find(a => a.name === elem.motherName);
          const result = { ...elem };

          if (father) {
            result.father = father;
          }

          if (mother) {
            result.mother = mother;
          }

          return result;
        });

        setPeople(resultPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {!loader && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loader && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loader && people.length !== 0 && (
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
                {people.map((currentPeople: Person) => (
                  <tr
                    key={currentPeople.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': slug === currentPeople.slug,
                    })}
                  >
                    <td>
                      <NavLink
                        to={currentPeople.slug}
                        className={classNames({
                          'has-text-danger': currentPeople.sex === 'f',
                        })}
                      >
                        {currentPeople.name}
                      </NavLink>
                    </td>

                    <td>{currentPeople.sex}</td>
                    <td>{currentPeople.born}</td>
                    <td>{currentPeople.died}</td>
                    <td>
                      {currentPeople.mother ? (
                        <Link
                          className="has-text-danger"
                          to={currentPeople.mother.slug}
                        >
                          {currentPeople.mother.name}
                        </Link>
                      ) : (
                        currentPeople.motherName
                          ? currentPeople.motherName
                          : '-'
                      )}
                    </td>
                    <td>
                      {currentPeople.father ? (
                        <Link
                          to={currentPeople.father.slug}
                        >
                          {currentPeople.father.name}
                        </Link>
                      ) : (
                        currentPeople.fatherName
                          ? currentPeople.fatherName
                          : '-'
                      )}
                    </td>
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
