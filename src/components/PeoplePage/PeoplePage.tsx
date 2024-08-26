import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const findSlugByName = (name: string | undefined) =>
    people.find(person => person.name === name)?.slug || '';

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
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
                      <PeopleTable
                        key={person.slug}
                        person={person}
                        slug={slug}
                        motherSlug={findSlugByName(person.motherName || '')}
                        fatherSlug={findSlugByName(person.fatherName || '')}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
