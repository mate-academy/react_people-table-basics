import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonTable } from '../contents/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fecthPeople = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getPeople();

        if (!isCancelled) {
          setPeople(data);
        }
      } catch {
        if (!isCancelled) {
          setError('Something went wrong');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fecthPeople();

    return () => {
      isCancelled = true;
    };
  }, []);

  const renderContent = () => {
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

    if (people.length === 0) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PersonTable people={people} selectedSlug={slug} />;
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">{renderContent()}</div>
        </div>
      </div>
    </main>
  );
};
