/* eslint-disable no-nested-ternary */
import { Link, NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { SEX } from '../../consts/Sex';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { slugParam } = useParams();

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
                {people.map((currentPeople: Person) => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                    mother,
                    father,
                  } = currentPeople;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': slugParam === slug,
                      })}
                    >
                      <td>
                        <NavLink
                          to={slug}
                          className={classNames({
                            'has-text-danger': sex === SEX.FEMALE,
                          })}
                        >
                          {name}
                        </NavLink>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {mother ? (
                          <Link
                            className="has-text-danger"
                            to={mother.slug}
                          >
                            {mother.name}
                          </Link>
                        ) : (
                          motherName !== null
                            ? motherName
                            : '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <Link
                            to={father.slug}
                          >
                            {father.name}
                          </Link>
                        ) : (
                          fatherName !== null
                            ? fatherName
                            : '-'
                        )}
                      </td>
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
