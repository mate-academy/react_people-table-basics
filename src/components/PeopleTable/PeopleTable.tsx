import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && (
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
              {people.map(person => {
                const mother =
                  people.find(
                    currentPerson => currentPerson.name === person.motherName,
                  ) || null;

                const father =
                  people.find(
                    currentPerson => currentPerson.name === person.fatherName,
                  ) || null;

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        <PersonLink person={mother} name={person.motherName} />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        <PersonLink person={father} name={person.fatherName} />
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
      </div>
    </div>
  );
};
