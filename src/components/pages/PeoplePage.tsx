import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const { personId } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      setError('');

      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
            <PeopleTable people={people} selectedPersonId={personId} />
          )}
        </div>
      </div>
    </>
  );
};
