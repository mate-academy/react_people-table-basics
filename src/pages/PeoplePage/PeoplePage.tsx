import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug = '' } = useParams();

  const recivePeople = useCallback(
    async () => {
      setIsLoading(true);
      const data = await getPeople();

      setPeople(data);
      setIsLoading(false);
    }, [],
  );

  useEffect(() => {
    recivePeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} personSlug={personSlug} />
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!people && (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>

              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
