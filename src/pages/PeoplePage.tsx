import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import PeopleTable from '../components/PeopleTable';

const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
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
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
