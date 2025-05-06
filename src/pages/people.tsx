import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople, wait } from '../api';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';

export const People = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setHasError(false);
        await wait(2000);
        getPeople().then(setPersons);
      } catch (error) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!persons && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {loading ? (
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

          <tbody>
            {persons.map(person => (
              <tr
                className={
                  selectedPerson && selectedPerson.name === person.name
                    ? 'has-background-warning'
                    : ''
                }
                onClick={() => setSelectedPerson(person)}
                key={person.name}
                data-cy="person"
              >
                <td>
                  <Link to={`#/${person.name}`}>{person.name}</Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName && (
                    <Link
                      className="has-text-danger"
                      to={`#/people/${person.slug.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {person.motherName}
                    </Link>
                  )}
                </td>

                <td>
                  {person.fatherName && (
                    <Link
                      className="has-text-danger"
                      to={`/people/${person.slug.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {person.fatherName}
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
