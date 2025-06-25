import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clickedSlug, setClickedSlug] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slug && slug.length > 0) {
      setClickedSlug(null);
    }
  }, [slug]);

  const selectedSlug: string | null = slug || clickedSlug || null;

  const isEmpty = !loading && !error && people.length === 0;
  const isLoaded = !loading && !error && people.length > 0;

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
          {isEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {isLoaded && (
            <PeopleTable
              people={people}
              selectedSlug={selectedSlug}
              onSelect={setClickedSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
