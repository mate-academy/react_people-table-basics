import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Error } from '../Error';
import { NoPeopleMessage } from '../NoPeopleMessage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { personSlug = '' } = useParams();

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasError && <Error />}
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {people.length
                ? (
                  <PeopleTable
                    people={people}
                    selectedPersonSlug={personSlug}
                  />
                )
                : <NoPeopleMessage />}
            </>
          )}
        </div>
      </div>
    </>
  );
};
