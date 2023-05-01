import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { findParent } from '../../helpers/helpers';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    const getPeopleFromServer = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const peopleFromServer = await getPeople();
        const peopleWithParents = findParent(peopleFromServer);

        setPeople(peopleWithParents);
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    };

    getPeopleFromServer();
  }, []);

  const hasNoPeople = people.length <= 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasNoPeople && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!hasNoPeople && !hasError && (
                <PeopleTable people={people} personId={slug} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
