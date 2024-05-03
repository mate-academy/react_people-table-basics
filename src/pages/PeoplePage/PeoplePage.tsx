import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { LoadingError } from '../../components/LoadingError';
import { NoPeopleMessage } from '../../components/NoPeopleMessage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const isLoadingSuccessful = !isLoading && !isFailed;
  const isNoPeopleMessageShown = !people.length && isLoadingSuccessful;
  const isPeopleTableShown = isLoadingSuccessful && !!people.length;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => {
        setIsFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isFailed && <LoadingError />}
              {isNoPeopleMessageShown && <NoPeopleMessage />}
              {isPeopleTableShown && (
                <PeopleTable
                  people={people}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
