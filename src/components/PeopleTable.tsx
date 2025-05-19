import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
// import { Link, Navigate, useParams } from 'react-router-dom';
// import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useNavigate } from 'react-router-dom';

export const PeopleTable = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const navigator = useNavigate();

  const getPerson = (name: string) => {
    const per = people.find(p => p.name === name);

    if (per) {
      navigator(`/people/${per.slug}`);
    }
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !errorMessage && people.length > 0 && (
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
                <PersonLink
                  key={person.slug}
                  person={person}
                  getPerson={getPerson}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

PeopleTable.displayName = 'PeopleTable';
