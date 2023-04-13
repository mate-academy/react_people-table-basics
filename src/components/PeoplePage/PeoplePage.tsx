import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const getPeopleFromTheServer = async () => {
      try {
        const peopleFromTheServer = await getPeople();

        setPeople(peopleFromTheServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleFromTheServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading && !isError) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length
            && <PeopleTable people={people} selectedSlug={slug} />}
        </div>
      </div>
    </>
  );
};
