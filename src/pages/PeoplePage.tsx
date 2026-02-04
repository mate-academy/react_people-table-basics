/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPeople(null);
    setError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true));
  }, []);

  const loading = people === null && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading &&
            !error &&
            Array.isArray(people) &&
            people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug ?? undefined} />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
