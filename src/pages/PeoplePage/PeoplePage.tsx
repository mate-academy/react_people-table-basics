import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorMesesage, setErrorMessage] = useState(false);
  const [people, setPeople] = useState<Person[] | undefined>(undefined);
  const { personLink } = useParams();
  const currentPerson = people?.find(person => person.slug === personLink);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && (<Loader />)}

          {errorMesesage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loading && people && (
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
                {people?.map((person) => {
                  const {
                    name, sex, born, died, motherName, fatherName, slug,
                  } = person;

                  const father = people.find(
                    dad => dad.name === fatherName,
                  )?.slug || null;

                  const mother = people.find(
                    mom => mom.name === motherName,
                  )?.slug || null;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': slug === currentPerson?.slug,
                      })}
                    >
                      <td>
                        <Link
                          to={`../${slug}`}
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
                      <td>
                        {mother && motherName ? (
                          <Link
                            to={`../${mother}`}
                            className="has-text-danger"
                          >
                            {motherName}
                          </Link>
                        ) : (<>{motherName || '-'}</>)}

                      </td>
                      <td>
                        {father && fatherName ? (
                          <Link
                            to={`../${father}`}
                          >
                            {fatherName}
                          </Link>
                        ) : (<>{fatherName || '-'}</>)}
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
