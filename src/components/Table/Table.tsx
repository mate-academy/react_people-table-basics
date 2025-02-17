import { useEffect } from 'react';
import { useLoading } from '../../LoadingContext';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import classNames from 'classnames';

export const Table = () => {
  const { people, setPeople, setLoading, setFetchError, loading, fetchError } =
    useLoading();
  const { personSlug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return loading ? (
    <Loader />
  ) : people.length > 0 ? (
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
        {people.map((person, index) => {
          const mother = people.find(
            curPerson => curPerson.name === person.motherName,
          );
          const father = people.find(
            curPerson => curPerson.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={index}
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={`${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className={classNames({
                      'has-text-danger': mother.sex === 'f',
                    })}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{father.name}</Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );
};
