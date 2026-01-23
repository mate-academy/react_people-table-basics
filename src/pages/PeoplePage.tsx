import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!people.length) {
      return;
    }

    if (slug) {
      const found = people.find(p => p.slug === slug) ?? null;

      setSelectedPerson(found);
    } else {
      setSelectedPerson(null);
    }
  }, [slug, people]);

  // Update URL when row is clicked
  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    navigate(`/people/${person.slug}`);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedPerson={selectedPerson}
              onSelectPerson={handleSelectPerson}
            />
          )}
        </div>
      </div>
    </>
  );
};
