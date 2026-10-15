import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(loadedPeople => {
        setPeople(loadedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people</p>;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>
      <p>
        <PeopleTable people={people} slug={slug} />
      </p>
    </div>
  );
};
