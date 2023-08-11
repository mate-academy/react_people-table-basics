/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { matchMotherAndFather } from './utils';

export const PeoplePage: React.FC = () => {
  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const selected = params.slug ? params.slug : '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => matchMotherAndFather(data))
      .then((data) => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading && (
        <Loader />
      )}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !loading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {people.length !== 0 && !loading && (
        <div className="block">
          <div className="box table-container">
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
                {people.map(({
                  slug, name, sex, born, died, mother, motherName, father, fatherName,
                }) => (
                  <tr
                    key={slug}
                    data-cy="person"
                    className={cn({
                      'has-background-warning': selected === slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${slug}`}
                        className={cn({
                          'has-text-danger': sex === 'f',
                        })}
                        onClick={() => selected === slug}
                      >
                        {name}
                      </Link>
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {mother?.slug ? (
                        <Link
                          to={`/people/${mother?.slug}`}
                          className={cn({
                            'has-text-danger': motherName,
                          })}
                          onClick={() => selected === mother?.slug}
                        >
                          {mother.name}
                        </Link>
                      ) : (
                        <p>{motherName || '-'}</p>
                      )}
                    </td>
                    <td>
                      {father?.slug ? (
                        <Link
                          to={`/people/${father?.slug}`}
                          onClick={() => selected === father?.slug}
                        >
                          {father.name}
                        </Link>
                      ) : (
                        <p>{fatherName || '-'}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
