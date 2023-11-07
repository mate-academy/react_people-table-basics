import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(person => {
        setPersons(person);
      })
      .catch(() => {
        setErrorMessage('There are no people on the server');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoading(false));
  });

  return (
    <div className="block">
      <div className="box table-container">
        {!loading ? (
          <Loader />
        ) : (
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

            <tbody >
              {persons.map((person) => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': person.slug === personSlug,
                  })}
                >
                  <td>
                    <Link
                      to={`#/people/${person.slug}`}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>
                    {person.sex}
                  </td>

                  <td>
                    {person.born}
                  </td>

                  <td>
                    {person.died}
                  </td>

                  <td>
                    -
                    {/* <a
                      className="has-text-danger"
                      href={`#/people/${person.motherSlug}`} // Note the change here
                    >
                      {person.motherName ? `${person.motherName}` : '-'}
                    </a> */}
                  </td>

                  <td>
                    {/* <a href={`#/people/${person.fatherSlug}`}> // Note the change here
                      {person.fatherName ? `${person.fatherName}` : '-'}
                    </a> */}
                    -
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">
          {errorMessage}
        </p>
      </div>
    </div>
  );
};
