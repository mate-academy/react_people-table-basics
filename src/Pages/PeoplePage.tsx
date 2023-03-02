import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { slug = '' } = useParams();

  const peopleFromServer = useCallback(async () => {
    setLoading(true);
    try {
      const peoples = await getPeople();

      setPeople(peoples);
      setLoading(false);
    } catch {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    peopleFromServer();
  }, []);

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <div className="block">
        <h1 className="title">People Page</h1>
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop" />

          <div className="box table-container">

            {loading ? (
              <Loader />
            ) : (
              <PeopleTable people={people} selectedSlug={slug} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
