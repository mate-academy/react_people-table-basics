import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';

type PeoplePageStatus =
  | 'success'
  | 'error'
  | 'loading'
  | 'areNoPeople'
  | 'idle';

export const PeoplePage = () => {
  const [pageStatus, setPageStatus] = useState<PeoplePageStatus>('idle');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setPageStatus('loading');

    getPeople()
      .then(fetchData => {
        setPeople(fetchData);
        if (fetchData.length === 0) {
          setPageStatus('areNoPeople');

          return;
        }

        setPageStatus('success');
      })
      .catch(() => {
        setPageStatus('error');
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {pageStatus === 'loading' && <Loader />}

          {pageStatus === 'error' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {pageStatus === 'areNoPeople' && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {pageStatus === 'success' && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
