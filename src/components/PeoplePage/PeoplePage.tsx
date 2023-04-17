import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleList } from './PeopleList/PeopleList';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasServerError, setHasServerError] = useState(false);
  const { personSlug = '' } = useParams();

  const getPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      setPeople(await getPeople());
    } catch {
      setHasServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const peopleExist = people.length > 0;
  const allowPeopleDisplay = !isLoading && !hasServerError && peopleExist;

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {hasServerError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!peopleExist && !isLoading && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {allowPeopleDisplay && (
          <PeopleList
            people={people}
            selectedPersonSlug={personSlug}
          />
        )}
      </div>
    </div>
  );
};
