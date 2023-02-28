import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { prepareDataFromServer } from '../utils/prepereDataFromServer';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsPeopleLoading(true);

      const peopleFromServer = await getPeople();

      setPeople(prepareDataFromServer(peopleFromServer));
      setIsPeopleLoading(false);
    } catch (error) {
      setIsError(true);
      setIsPeopleLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isPeopleLoading
            ? <Loader />
            : (
              <>
                <p
                  data-cy="peopleLoadingError"
                  className={cn('has-text-danger', {
                    'is-hidden': !isError,
                  })}
                >
                  Something went wrong
                </p>

                <p
                  data-cy="noPeopleMessage"
                  className={cn({
                    'is-hidden': !!people.length,
                  })}
                >
                  There are no people on the server
                </p>

                {!!people.length
                  && (
                    <PeopleTable people={people} />
                  )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
