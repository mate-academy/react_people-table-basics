import { useEffect, useState } from 'react';
import { Person } from '../types/Person'; // Перевір шлях
import { getPeople } from '../api'; // Перевір шлях до api.ts
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []); // Порожній масив залежностей — запит піде лише один раз при монтуванні

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {/* Показуємо лоадер ТІЛЬКИ якщо isLoading === true */}
          {isLoading && <Loader />}

          {/* Показуємо помилку ТІЛЬКИ якщо завантаження закінчилось і є помилка */}
          {!isLoading && hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {/* Показуємо повідомлення, якщо масив порожній і немає помилок */}
          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {/* Показуємо таблицю ТІЛЬКИ якщо в масиві є хоча б одна людина */}
          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
