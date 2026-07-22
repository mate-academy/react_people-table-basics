import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">Unable to load people</p>;
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">No people found</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} selectedPersonSlug={slug} />
    </>
  );
};
