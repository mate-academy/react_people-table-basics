import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import PeopleTable from '../components/PeopleTable/PeopleTable';
export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!isLoading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !error && people.length > 0 && (
          <PeopleTable people={people} selectedPersonSlug={slug} />
        )}
      </div>
    </div>
  );
}
