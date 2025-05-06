import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople, wait } from '../api';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { getSlug } from '../api';

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
      {persons.length === 0 && (
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
            {persons.map(person => {
              const mother = persons.find(p => p.name === person.motherName);
              const father = persons.find(p => p.name === person.fatherName);

              return (
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
                    <Link to={`/people/${getSlug(person.name, person.born)}`}>
                      {' '}
                      {person.name}{' '}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      mother ? (
                        <Link
                          className="has-text-danger"
                          to={`/people/${getSlug(mother.name, mother.born)}`}
                        >
                          {person.motherName}
                        </Link>
                      ) : (
                        person.motherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>

                  <td>
                    {person.fatherName ? (
                      father ? (
                        <Link
                          className="has-text-danger"
                          to={`/people/${getSlug(father.name, father.born)}`}
                        >
                          {person.fatherName}
                        </Link>
                      ) : (
                        person.fatherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
