import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import PersonLink from '../PersonLink/PersonLink';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setErrorMessage(false);
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && (
          <Loader />
        )}
        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!loading && !errorMessage && (
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
                const renderParent = (parentName: string | null) => {
                  const parentObj = people
                    .find(pers => pers.name === parentName);

                  if (!parentObj && !parentName) {
                    return '-';
                  }

                  if (parentObj && parentName) {
                    return <PersonLink person={parentObj} />;
                  }

                  return parentName;
                };

                const personSlug = `${person?.name.toLowerCase().replace(/\s+/g, '-')}-${person?.born}`;

                return (
                  <tr
                    data-cy="person"
                    key={person.name}
                    className={cn({
                      'has-background-warning': personSlug === slug,
                    })}
                  >
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    <td>
                      {renderParent(person.motherName)}
                    </td>

                    <td>
                      {renderParent(person.fatherName)}
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
