import { useEffect, useState } from 'react';
import { Person } from '../types';

import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [list, setList] = useState<Person[]>([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsListLoading(true);

    getPeople()
      .then(setList)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsListLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {errorMessage !== '' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isListLoading ? <Loader /> : <PeopleTable people={list} />}

          {list?.length === 0 && !isListLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
