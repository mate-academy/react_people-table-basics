import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Link, NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import classNames from 'classnames';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { slug } = useParams();

  const isSelectedPerson = (
    selectedPerson: Person | null | undefined,
    person: { slug: string | undefined },
  ) => {
    return selectedPerson && selectedPerson.slug === person.slug;
  };

  const selectedPerson = slug
    ? people.find(person => person.slug === slug)
    : null;

  const renderPersonName = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(person => person.name === name);

    if (foundPerson) {
      return (
        <NavLink
          to={`/people/${foundPerson.slug}`}
          className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
        >
          {name}
        </NavLink>
      );
    }

    return name;
  };

  useEffect(() => {
    setError('');
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Unable to load people data'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
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
                {people.map(peop => (
                  <tr
                    data-cy="person"
                    key={peop.slug}
                    className={
                      isSelectedPerson(selectedPerson, peop)
                        ? 'has-background-warning'
                        : ''
                    }
                  >
                    <td>
                      <Link
                        to={`${peop.slug}`}
                        className={peop.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {peop.name}
                      </Link>
                    </td>
                    <td>{peop.sex}</td>
                    <td>{peop.born}</td>
                    <td>{peop.died}</td>
                    <td>{renderPersonName(peop.motherName)}</td>
                    <td>{renderPersonName(peop.fatherName)}</td>
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
