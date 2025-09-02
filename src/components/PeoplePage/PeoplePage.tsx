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
    fetch('../../../public/api/people.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        return res.json();
      })
      .then((data: Person[]) => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Something went wrong');
        setIsLoading(false);
      });
  }, []);

  // https://api.example.com/people

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
