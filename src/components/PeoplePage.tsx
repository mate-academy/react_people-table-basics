import { Loader } from './Loader/Loader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { personSlug } = useParams<{ personSlug: string }>();

  const activePerson = people.find(person => person.slug === personSlug);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : error ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={people} active={activePerson} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
