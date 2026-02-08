/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../utils/api';
import { Person } from '../../types/Person';
import { PeopleList } from '../../components/PeopleList';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();


  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loading && !error && people.length > 0 && (
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

              <PeopleList persons={people}  selectedSlug={slug}/>
            </table>
          )}

          {error && (
            <p className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
