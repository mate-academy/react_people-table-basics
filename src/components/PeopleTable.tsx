import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="box table-container">
      {loading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && people.length === 0 && !error && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && (
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
              const isActiveRow = slug === person.slug;
              const motherObj = people.find(p => p.name === person.motherName);
              const fatherObj = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': isActiveRow,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {motherObj ? (
                      <PersonLink person={motherObj} />
                    ) : person.motherName ? (
                      person.motherName
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {fatherObj ? (
                      <PersonLink person={fatherObj} />
                    ) : person.fatherName ? (
                      person.fatherName
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
  );
};
