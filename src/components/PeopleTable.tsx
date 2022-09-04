import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((res) => {
        setPeople(res);
      })
      .catch(() => setErrorLoad(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isSelected = (person: Person) => person.slug === slug;

  const findMother = (person: Person) => people
    .find(mother => person.motherName === mother.name);
  const findFather = (person: Person) => people
    .find(father => father.name === person.fatherName);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorLoad && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
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
              {people.map(person => (

                <tr
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': isSelected(person),
                  })}
                  key={person.slug}
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}`}
                      style={{ color: person.sex === 'f' ? 'red' : 'blue' }}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>

                    {findMother(person)
                      ? (
                        <Link to={`/people/${findMother(person)?.slug}`} style={{ color: 'red' }}>
                          {person.motherName }
                        </Link>
                      )
                      : person.motherName || '-'}
                  </td>
                  <td>
                    { findFather(person)
                      ? (
                        <Link to={`/people/${findFather(person)?.slug}`}>
                          { person.fatherName}
                        </Link>
                      )
                      : person.fatherName || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
