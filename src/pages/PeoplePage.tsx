import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink/PersonLink';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getPersonByName = (name: string | null): Person | null => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!isLoading && !hasError && (
        <PeopleTable
          people={people}
          selectedSlug={slug || null}
          PersonLinkComponent={PersonLink}
          getPersonByName={getPersonByName}
        />
      )}
    </>
  );
};
