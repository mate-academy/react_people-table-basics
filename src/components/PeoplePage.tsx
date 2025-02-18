import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong');
  const [selectedPersonSlug, setSelectedPersonSlug] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const preparedData = data.map(p => {
          const mother = data.find(d => d.name === p.motherName);
          const father = data.find(d => d.name === p.fatherName);

          return {
            ...p,
            mother: mother || undefined,
            father: father || undefined,
          };
        });

        setPersons(preparedData);
      })
      .catch(err => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
        setErrorMessage('');
      });
  }, []);

  const handleSelectedPerson = (slug: string) => {
    setSelectedPersonSlug(slug);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {persons?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

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
                  {persons &&
                    persons.map(person => (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames({
                          'has-background-warning':
                            person.slug === selectedPersonSlug,
                        })}
                      >
                        <td>
                          <PersonLink
                            person={person}
                            handleClick={handleSelectedPerson}
                          />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.mother ? (
                            <PersonLink
                              person={person.mother}
                              handleClick={handleSelectedPerson}
                            />
                          ) : person.motherName ? (
                            person.motherName
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {person.father ? (
                            <PersonLink
                              person={person.father}
                              handleClick={handleSelectedPerson}
                            />
                          ) : person.fatherName ? (
                            person.fatherName
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};
