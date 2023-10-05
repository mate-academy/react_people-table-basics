/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLint';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const { slug: selectedSlug } = useParams();

  useEffect(() => {
    setLoader(true);
    setError(false);

    getPeople()
      .then(setPeople)
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
          {
            loader && (
              <Loader />
            )
          }

          {
            error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )
          }

          {
            !error && people && !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          }

          {
            !error && people && (
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
                  {
                    people.map(person => {
                      const {
                        sex,
                        born,
                        died,
                        fatherName,
                        motherName,
                        slug,
                      } = person;

                      const mother = people.find(mom => mom.name === motherName);
                      const father = people.find(dad => dad.name === fatherName);

                      return (
                        <tr
                          data-cy="person"
                          className={classNames({
                            'has-background-warning': slug === selectedSlug,
                          })}
                        >
                          <td>
                            <PersonLink person={person} />
                          </td>

                          <td>{sex}</td>
                          <td>{born}</td>
                          <td>{died}</td>
                          <td>
                            {
                              (mother && (
                                <PersonLink person={mother} />
                              ))
                              || (motherName && (
                                motherName
                              ))
                              || '-'
                            }
                          </td>
                          <td>
                            {
                              (father && (
                                <PersonLink person={father} />
                              ))
                              || (fatherName && (
                                fatherName
                              ))
                              || '-'
                            }
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </>
  );
};
