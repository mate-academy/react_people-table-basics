import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople, Person } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}
      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!isLoading && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug} />
      )}
    </>
  );
};
