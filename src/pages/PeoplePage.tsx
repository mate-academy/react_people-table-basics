import React, { useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((people) => setPeopleFromServer(people))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let content;

  if (error) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (isLoading) {
    content = <Loader />;
  } else if (peopleFromServer.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  } else {
    content = <PeopleTable people={peopleFromServer} />;
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {content}
        </div>
      </div>
    </div>
  );
};
