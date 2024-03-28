import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';

type ResponseStatus = 'idle' | 'fulfield' | 'rejected' | 'pending';

export const PeoplePage: React.FC = () => {
  const [status, setStatus] = useState<ResponseStatus>('idle');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setStatus('pending');
    getPeople()
      .then(response => {
        setPeople(response);
        setStatus('fulfield');
      })
      .catch(() => {
        setPeople([]);
        setStatus('rejected');
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {status === 'pending' && <Loader />}

          {status === 'rejected' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {status === 'fulfield' && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {status === 'fulfield' && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
