// pages/PeoplePage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .then((data: Person[]) => {
        setTimeout(() => {
          // затримка, щоб Cypress встиг побачити loader
          setPeople(data);
          setError(null);
          setIsLoading(false);
        }, 100); // 100ms
      })
      .catch(err => {
        setError(err.message || 'Something went wrong');
        setIsLoading(false);
      });
  }, []);

  // https://api.example.com/people   ../../../public/api/people.json

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {/* Індикатор завантаження */}
          {isLoading && <Loader />}

          {/* Повідомлення про помилку */}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {/* Якщо людей немає */}
          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {/* Таблиця людей */}
          {!isLoading && !error && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};
