import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleTable } from '../People/PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {hasError && (
                  <p
                    data-cy="peopleLoadingError"
                    className="has-text-danger"
                  >
                    Unable to load people from server
                  </p>
                )}

                {people.length === 0
                  ? (
                    <p data-cy="noPeopleMessage">
                      No people loaded from server
                    </p>
                  ) : ''}

                <PeopleTable people={people} selectedSlug={slug} />
              </>
            )}
        </div>
      </div>
    </>
  );
};
