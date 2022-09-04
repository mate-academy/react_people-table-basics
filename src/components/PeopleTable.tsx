import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then((apiPeople) => {
        setPeople(apiPeople);
        if (people.length === 0) {
          setErrorMsg('There are no people on the server');
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people.map(persone => {
    return {
      ...persone,
      mother: people.find(parent => parent.name === persone.motherName),
      father: people.find(parent => parent.name === persone.fatherName),
    };
  });

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {visiblePeople.length > 0
          ? (
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
                {visiblePeople.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames(
                      { 'has-background-warning': person.slug === slug },
                    )}
                  >
                    <td>
                      <Link
                        to={`../${person.slug}`}
                        className={classNames(
                          { 'has-text-danger': person.sex === 'f' },
                        )}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother
                        ? (
                          <Link
                            to={`../${person.mother.slug}`}
                            className="has-text-danger"
                          >
                            {person.mother.name}
                          </Link>
                        )
                        : person.motherName
                          || '-'}
                    </td>
                    <td>
                      {person.father
                        ? (
                          <Link to={`../${person.father.slug}`}>
                            {person.father.name}
                          </Link>
                        )
                        : person.fatherName
                          || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : (
            <p data-cy="noPeopleMessage">
              {errorMsg}
            </p>
          )}
      </div>
    </div>
  );
};
