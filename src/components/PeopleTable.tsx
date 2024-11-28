import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { slug } = useParams();

  const isSelected = people.find(person => person.slug === slug);

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Unable to load data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!people.length && !error && !loading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!error && !loading && !!people.length && (
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
                const {
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug: personSlug,
                } = person;

                const mother = people.find(p => p.name === person.motherName);
                const father = people.find(p => p.name === person.fatherName);

                return (
                  <tr
                    key={personSlug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': personSlug === isSelected?.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {mother ? (
                        <PersonLink person={mother} />
                      ) : (
                        motherName || '-'
                      )}
                    </td>
                    <td>
                      {father ? (
                        <PersonLink person={father} />
                      ) : (
                        fatherName || '-'
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
