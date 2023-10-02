import { useLayoutEffect, useState } from 'react';

import { PeopleContent } from '../components/PeopleContent';
import { Person } from '../types';
import { fetchPeople } from '../api/fetchPeople';
import { getNormalizedPeopleList } from '../helpers/getNormalizedPeopleList';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const normalizedPeopleList = getNormalizedPeopleList(peopleList);

  useLayoutEffect(() => {
    setIsLoading(true);

    fetchPeople()
      .then(data => setPeopleList(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <PeopleContent
            people={normalizedPeopleList}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};
