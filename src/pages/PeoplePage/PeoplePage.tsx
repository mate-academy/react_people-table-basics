import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (isLoading) {
    return <Loader data-cy="loader" />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title" data-cy="pageTitle">
        People Page
      </h1>
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <PeopleTable people={people} selectedSlug={slug || null} />
      )}
    </>
  );
};
