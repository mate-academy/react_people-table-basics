import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { getPeople } from '../api';

export const PersonLink: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  function loadPeople() {
    setIsloading(true);

    return getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsloading(false));
  }

  useEffect(() => {
    loadPeople();
  }, []);

  const mother = (name: string | null, woman?: boolean) => {
    if (name) {
      return (
        people.some(p => p.name === name)
          ? (
            <a
              className={
                cn({ 'has-text-danger': woman })
              }
              href={`#/people/${people.find(p => p.name === name)?.slug}`}
            >
              {name}
            </a>
          )
          : name
      );
    }

    return '-';
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && (
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
                    className={
                      cn({ 'has-background-warning': person.slug === slug })
                    }
                    data-cy="person"
                  >
                    <td>
                      <a
                        className={
                          cn({ 'has-text-danger': person.sex === 'f' })
                        }
                        href={`#/people/${person.slug}`}
                      >
                        {person.name}
                      </a>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{mother(person.motherName, true)}</td>
                    <td>{mother(person.fatherName)}</td>
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
