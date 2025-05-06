import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople, wait } from '../api';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';

export const People = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [erroMessage] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await wait(2000);
      getPeople().then(setPersons);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {erroMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                  {person.motherName && person.motherName && (
                    <Link
                      className="has-text-danger"
                      to={`#/people/${person.motherName.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {person.motherName}
                    </Link>
                  )}
                </td>

                <td>
                  {person.fatherName && person.fatherName && (
                    <Link
                      className="has-text-danger"
                      to={`#/people/${person.fatherName.toLowerCase().replace(/\s+/g, '-')}`}
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
