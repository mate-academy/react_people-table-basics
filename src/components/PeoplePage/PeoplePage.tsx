import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeoplePage/PeopleTable';
import { Loader } from '../Loader';
import { Person } from '../../types';
import personsWithParents from '../../utils/PeopleData';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        const enrichedPeople = personsWithParents(fetchedPeople);

        setPeople(enrichedPeople);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person.slug);
  };

  useEffect(() => {
    setSelectedPerson(slug ?? null);
  }, [slug]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      {people.length > 0 ? (
        <PeopleTable
          people={people}
          selectedPerson={selectedPerson}
          onPersonSelect={handlePersonSelect}
        />
      ) : (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
