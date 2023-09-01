import { FC, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPeoplesAndParents } from '../../helpers';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleFromServer = await getPeople();
        const visiblePeople = getPeoplesAndParents(peopleFromServer);

        setPeople(visiblePeople);
      } catch (error) {
        setErrorMessage(`Something went wrong: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isNotVisiblePeopleFromServer
  = !people.length && !errorMessage && !isLoading;

  const isVisiblePeopleTable = people.length > 0 && !errorMessage && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isVisiblePeopleTable && <PeopleTable people={people} />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isNotVisiblePeopleFromServer && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
