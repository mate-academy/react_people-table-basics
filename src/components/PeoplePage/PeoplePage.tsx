import {
  FC, useCallback, useEffect, useState,
} from 'react';

import { PeopleTable } from '../PeopleTable/PeopleTable';
import { preparedPeople } from '../utitlites';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getListOfPeople = useCallback(async () => {
    try {
      const listOfPeople = await preparedPeople();

      setPeople(listOfPeople);
    } catch {
      setError('Can\'t load data from server');
    }
  }, []);

  useEffect(() => {
    getListOfPeople();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {people
        ? <PeopleTable people={people} />
        : <p>Loading...</p>}
    </div>
  );
};
