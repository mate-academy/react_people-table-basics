import { useEffect, useState } from 'react';
import { PersonRow } from '../PersonRow';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';

export const PeopleTable = () => {
  const { slug } = useParams();
  const normalizedSlug = slug || null;

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="box table-container">
      {loading && <Loader />}

      {errorMessage !== '' && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {people.length === 0 && !loading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {people.length > 0 && !loading && (
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
              <PersonRow
                people={people}
                person={person}
                slug={normalizedSlug}
                key={person.slug}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
