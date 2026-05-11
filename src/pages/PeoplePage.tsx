import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug = '' } = useParams();

  const selectedSlug = slug;

  useEffect(() => {
    setIsLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .then(data => {
        setPeople(data);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={selectedSlug} />
          )}
        </div>
      </div>
    </>
  );
};
