import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../People/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(err => setError(err));
  }, []);

  return (
    <div>
      <h1 className="title" data-cy="peoplePage">
        People Page
      </h1>

      {error ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : people === null ? (
        <Loader />
      ) : people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <PeopleTable people={people} selectedSlug={slug ?? ''} />
      )}
    </div>
  );
};
