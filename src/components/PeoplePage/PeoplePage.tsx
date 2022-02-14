import React, { useState, useEffect } from 'react';
import { getPeople } from 'api/people';
import { PeopleTable } from './PeopleTable';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner';
import { LoadingError } from 'components/LoadingError/LoadingError';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        await getPeople()
          .then(setPeople);

        setIsLoading(false);
      } catch {
        setHasLoadingError(true);
        setIsLoading(false);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div>
      <h1 className="title">People page</h1>

      {isLoading && (
        <TailSpin color="#485FC7" height={40} width={40} />
      )}

      {people.length > 0 && (
        <PeopleTable people={people} />
      )}

      {hasLoadingError && (
        <LoadingError />
      )}
    </div>
  );
};
