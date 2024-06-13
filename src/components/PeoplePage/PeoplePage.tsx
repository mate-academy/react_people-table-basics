import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const params = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getMotherLink = (motherName: string) => {
    const m = people.find(mName => mName.name === motherName);

    if (m) {
      return (
        <Link to={`/people/${m.slug}`} className="has-text-danger">
          {m.name}
        </Link>
      );
    }

    return motherName;
  };

  const getFatherLink = (fatherName: string) => {
    const f = people.find(fName => fName.name === fatherName);

    if (f) {
      return <Link to={`/people/${f.slug}`}>{f.name}</Link>;
    }

    return fatherName;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!loading && !people.length && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && (
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
                {people.map(
                  ({ slug, sex, born, died, motherName, fatherName, name }) => (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': params.slug === slug,
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${slug}`}
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
                      <td>{motherName ? getMotherLink(motherName) : '-'}</td>
                      <td>{fatherName ? getFatherLink(fatherName) : '-'}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
