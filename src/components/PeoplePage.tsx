import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  function findMotherInPeople(person: Person) {
    const mother = people.find(p => p.name === person.motherName);

    if (mother) {
      return <PersonLink person={mother} />;
    }

    return person.motherName ? person.motherName : '-';
  }

  function findFatherInPeople(person: Person) {
    const father = people.find(p => p.name === person.fatherName);

    if (father) {
      return <PersonLink person={father} />;
    }

    return person.fatherName ? person.fatherName : '-';
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {errorMessage && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people && (
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
                      key={person.slug}
                      className={
                        person.slug === slug ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <Link
                          to={person.slug}
                          className={
                            person.sex === 'f' ? 'has-text-danger' : ''
                          }
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>{findMotherInPeople(person)}</td>
                      <td>{findFatherInPeople(person)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
