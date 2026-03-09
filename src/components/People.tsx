import { getPeople } from '../utils/getPeople';
import { Person } from '../types/Person';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import classNames from 'classnames';
import { PersonLink } from '../components/PersonLink';

export const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { personID } = useParams();
  const selectedPerson = personID;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
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
              className={classNames({
                'has-background-warning': person.slug === selectedPerson,
              })}
            >
              <td>
                <PersonLink
                  name={person.name}
                  people={people}
                  to={selectedPerson === person.slug ? '..' : undefined}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} people={people} />
              </td>
              <td>
                <PersonLink name={person.fatherName} people={people} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      )}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !isLoading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
