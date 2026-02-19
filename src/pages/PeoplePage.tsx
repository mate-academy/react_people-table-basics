import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>

      {error && (
        <div className="notification is-danger">Failed to load people</div>
      )}

      {!error && <PeopleTable people={people} />}
    </div>
  );
};
