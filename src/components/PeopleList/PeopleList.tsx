import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeopleList: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { personName } = useParams();
  const selectedPerson: string = personName ?? '';

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((list: Person[]) => {
        setPeopleList(list);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {hasError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <PeopleTable
                  peopleList={peopleList}
                  selectedPerson={selectedPerson}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
