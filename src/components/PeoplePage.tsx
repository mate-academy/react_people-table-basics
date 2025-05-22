import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { useLocation } from 'react-router-dom';
import { PersonData } from './PersonData';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {errorMessage === 'Something went wrong' && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people?.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && errorMessage === '' && (
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
                  {people?.map(person => (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={
                        location.pathname === `/people/${person.slug}`
                          ? 'has-background-warning'
                          : ''
                      }
                    >
                      <PersonData people={people} name={person.name} />

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <PersonData people={people} name={person.motherName} />
                      <PersonData people={people} name={person.fatherName} />
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
