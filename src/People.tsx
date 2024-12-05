import { Loader } from './components/Loader';
import { getPeople } from './api';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { PersonLink } from './components/PersonLink';
import { useParams } from 'react-router-dom';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { slug } = useParams();
  const chosenPerson = people.find(p => slug === p.slug);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

            {people.length === 0 && !isLoading ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              !isLoading && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
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
                          chosenPerson === person
                            ? `has-background-warning`
                            : ''
                        }
                      >
                        <td>
                          <PersonLink
                            person={person}
                            people={people}
                            name={person.name}
                          />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          <PersonLink
                            person={people.find(
                              p => p.name === person.motherName,
                            )}
                            people={people}
                            name={person.motherName}
                          />
                        </td>
                        <td>
                          <PersonLink
                            person={people.find(
                              p => p.name === person.fatherName,
                            )}
                            people={people}
                            name={person.fatherName}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
