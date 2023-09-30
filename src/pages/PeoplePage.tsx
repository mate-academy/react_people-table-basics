import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople, ERRORS, getPreparedPeople } from '../utils';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [noPeopleOnServer, setNoPeopleOnServer] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const currentPeople = await getPeople();

        if (!currentPeople.length) {
          setErrorMessage(ERRORS.NO_PEOPLE_ERROR);
          setNoPeopleOnServer(true);
        } else {
          setNoPeopleOnServer(false);
        }

        setPeople(getPreparedPeople(currentPeople));
      } catch (error) {
        setErrorMessage(ERRORS.DOWNLOAD_ERROR);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const canShowTable = !errorMessage && !!people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p
              data-cy={!noPeopleOnServer
                ? 'peopleLoadingError'
                : 'noPeopleMessage'}
              className={classNames({
                'has-text-danger': !noPeopleOnServer,
              })}
            >
              {errorMessage}
            </p>
          )}

          {canShowTable && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
