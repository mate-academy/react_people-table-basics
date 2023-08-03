import React, { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { People } from '../People/People';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const ErrorBlock = (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );

  const EmptyPeopleBlock = (
    <p data-cy="noPeopleMessage">
      There are no people on the server
    </p>
  );

  const renderingBlock = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return ErrorBlock;
    }

    if (!people.length) {
      return EmptyPeopleBlock;
    }

    return <People people={people} />;
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {renderingBlock()}
        </div>
      </div>
    </div>
  );
};
