import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTabel';

type Props = {
  slugPerson: string | undefined,
};

export const PeoplePage: React.FC<Props> = ({ slugPerson }) => {
  const [people, setPeople] = useState<Person[]>();
  const [error, setError] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const result = await getPeople();

      setPeople(result);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}
          {error && isLoading && (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </>
          )}

          <PeopleTable people={people} slugPerson={slugPerson} />
        </div>
      </div>
    </>
  );
};
