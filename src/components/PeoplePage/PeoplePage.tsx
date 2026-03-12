import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants/api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [status, setStatus] = useState('loading');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setStatus('loading');

    fetch(`${API_URL}/people.json`)
      .then(response => response.json())
      .then(data => {
        setPeople(data);
        setStatus(data.length === 0 ? 'empty' : 'success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

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

          {status === 'success' && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
