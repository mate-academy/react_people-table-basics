import { useEffect, useState } from 'react';

import { Person } from '../types/Person';
import { getPeople } from '../api';

import { InfoBlock } from '../components/InfoBlock';
import { PeopleTable } from '../components/PeopleTable';
import { connectParents } from '../util/connectParents';

export const PeoplePage = () => {
  const [peopleFromApi, setPeopleFromApi] = useState<Person[]>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        setPeopleFromApi(people.map(connectParents));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <InfoBlock
            isLoading={isLoading}
            hasError={hasError}
            isEmpty={peopleFromApi.length === 0}
          />
          {peopleFromApi.length !== 0 && <PeopleTable people={peopleFromApi} />}
        </div>
      </div>
    </>
  );
};
