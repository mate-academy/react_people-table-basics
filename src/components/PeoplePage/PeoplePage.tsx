import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Loader } from '../Loader';

type Props = {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeoplePage = ({ hasError, setHasError }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setHasError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {/* Loading */}
      {isLoading && <Loader />}

      {/* If error*/}
      {hasError && !isLoading && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {/* empty */}
      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {/* Sucess */}
      {!isLoading && !hasError && people.length > 0 && (
        <PeopleTable people={people} slug={slug} />
      )}
    </>
  );
};
