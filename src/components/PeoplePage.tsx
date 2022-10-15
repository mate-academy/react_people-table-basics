import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  async function loadPeople() {
    setIsLoading(true);
    try {
      setLoadingError(false);
      const response = await getPeople();

      setPeople(response);
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadPeople();
  }, []);

  function searchName(name: string | null) {
    const existPerson = people.find(person => person.name === name);

    if (!existPerson) {
      return name || '-';
    }

    return <PersonLink person={existPerson} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !loadingError && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && !loadingError && (
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
                    key={person.name}
                    className={classNames(
                      { 'has-background-warning': person.slug === slug },
                    )}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {searchName(person.motherName)}
                    </td>
                    <td>
                      {searchName(person.fatherName)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
