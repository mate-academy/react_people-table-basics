import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from './components/Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from './api';
import { Person } from './types';

export const PeoplePage = () => {
  // 1. Инициализируем null, чтобы отличить "еще не загрузили" от "пусто"
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (personSlug: string) => {
    navigate(`/people/${personSlug}`);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && isError && (
        <p data-cy="peopleLoadingError">Something went wrong</p>
      )}

      {/* Проверяем people !== null, чтобы не мигало при первой загрузке */}
      {!loading && !isError && people !== null && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !isError && people !== null && people.length > 0 && (
        <div data-cy="peopleTable">
          <PeopleTable
            people={people}
            selectedSlug={slug || null}
            onSelect={handleSelect}
          />
        </div>
      )}
    </>
  );
};
