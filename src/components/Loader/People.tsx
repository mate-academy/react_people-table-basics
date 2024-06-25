import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const People: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
    .then(setData)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const people: Person[] = data.map(person => ({
    ...person,
    mother: data.find(p => p.name === person.motherName),
    father: data.find(p => p.name === person.fatherName),
  }))

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length < 1 && !loading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && (
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
              {people.map(person => {
                const { name, sex, born, died, mother, father, fatherName, motherName } = person;

                return (
                  <tr
                    key={name}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
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
                      {mother ? (
                        <Link
                          className="has-text-danger"
                          to={`/people/${mother.slug}`}
                        >
                          {mother.name}
                        </Link>
                      ) : (
                        motherName || '-'
                      )}
                    </td>

                    <td>
                      {father ? (
                        <Link to={`/people/${father.slug}`}>{father.name}</Link>
                      ) : (
                        fatherName || '-'
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
  );
};
