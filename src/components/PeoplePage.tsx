import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

export const PeoplePage = () => {
  const { personId } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  function findParent(parent: string | null) {
    return people.find(person => person.name === parent);
  }

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="box table-container">
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
              {people.map((person) => {
                const father = findParent(person.fatherName);
                const mother = findParent(person.motherName);

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === personId,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {mother
                        ? <PersonLink person={mother} />
                        : person.motherName || '-'}
                    </td>
                    <td>
                      {father
                        ? <PersonLink person={father} />
                        : person.fatherName || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        </div>
      )}
    </div>
  );
};
