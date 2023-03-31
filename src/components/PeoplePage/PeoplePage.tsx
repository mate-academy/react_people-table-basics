import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { PersonType } from '../../types/Person';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const match = useMatch('/people/:personId');
  const selectedPersonId = match?.params.personId || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople().then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      {isLoading
        ? <Loader />
        : (
          <div className="box table-container">
            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            <PeopleTable
              people={people}
              personId={selectedPersonId}
            />
          </div>
        )}
    </div>
  );
};
