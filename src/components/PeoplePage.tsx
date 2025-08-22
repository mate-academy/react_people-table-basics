import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import PeopleTable from './PeopleTable';

function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (newSlug: string) => {
    navigate(`/people/${newSlug}`);
  };

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

          {people.length === 0 && !loading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !loading && !error && (
            <PeopleTable
              people={people}
              selectedSlug={slug || null}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PeoplePage;
