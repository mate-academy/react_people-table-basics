import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { slug = '' } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setIsLoaded(true);
        setPeople(peopleFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const noPeople = isLoaded && !people.length;
  const showPeople = isLoaded && people.length;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {noPeople && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {showPeople && (<PeopleTable people={people} selectedSlug={slug} />)}
      </div>
    </div>
  );
};
