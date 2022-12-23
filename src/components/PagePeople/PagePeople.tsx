import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PageTable } from '../PageTable/PageTable';

export const PagePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { personMan } = useParams();

  useEffect(() => {
    getPeople()
      .then((res) => {
        setPeople(res);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            && <Loader />}
          {hasError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {people.length === 0 && !hasError && isLoaded
            && (
              <p data-cy="noPeopleMessage" className="has-text-danger">
                no people
              </p>
            )}
          {isLoaded && people.length > 0
            && (
              <PageTable people={people} selectedMan={personMan} />
            )}
        </div>
      </div>
    </>
  );
};
