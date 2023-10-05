import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLint';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug: selectedSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {
            isLoading && (
              <Loader />
            )
          }

          {
            isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )
          }

          {
            !isError && !isLoading && !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          }

          {
            !isError && !isLoading && !!people.length && (
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

                      const mother = people
                        .find(mom => mom.name === motherName);
                      const father = people
                        .find(dad => dad.name === fatherName);

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
