import { Loader } from '../Loader';
import { useContext, useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../context/PeopleContext';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [status, setStatus] = useState('loading');
  const { setPeople } = useContext(PeopleContext);

  useEffect(() => {
    setStatus('loading');

    getPeople()
      .then(data => {
        setPeople(data);
        setStatus(data.length === 0 ? 'empty' : 'success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, [setPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {status === 'loading' && <Loader />}

          {status === 'error' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {status === 'empty' && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {status === 'success' && <PeopleTable />}
        </div>
      </div>
    </>
  );
};
