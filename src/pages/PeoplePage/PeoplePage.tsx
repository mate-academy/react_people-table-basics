import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/peopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userUrl = '' } = useParams();

  useEffect(() => {
    const peopleGetter = async () => {
      try {
        const peoples = await getPeople();

        setPeople(peoples);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);

    peopleGetter();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(people && !people?.length) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people && <PeopleTable people={people} selectedUser={userUrl} />}
      </div>
    </div>
  );
};
