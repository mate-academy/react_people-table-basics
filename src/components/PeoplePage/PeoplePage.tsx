import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { getPeople } from '../../api/apiPeople';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import './peoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useAsyncEffect(async () => {
    try {
      const peopleFromServer = await getPeople();

      setIsLoading(false);
      setHasError(false);
      setPeople(peopleFromServer);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  }, []);

  return (
    <div className="People">
      {hasError && (
        <p className="error-message">
          There was a problem loading data from the server, please try again later
        </p>
      )}

      {isLoading && 'loader'}

      {people && <PeopleTable people={people} />}
    </div>
  );
};
