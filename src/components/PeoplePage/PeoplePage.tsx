/* eslint-disable no-console */
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { getPeople } from '../../api/apiPeople';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useAsyncEffect(async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  }, []);

  return (
    <div className="People">
      {people && <PeopleTable people={people} />}
    </div>
  );
};
