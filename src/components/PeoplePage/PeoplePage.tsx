/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const { personName } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader ? <Loader /> : null}
          {hasError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : null}

          {
            people.length === 0 && !loader
              ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : null
          }

          {
            people.length > 0 ? (
              <PeopleTable people={people} personName={personName} />
            ) : null
          }
        </div>
      </div>
    </div>
  );
};
