import { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { preparePeople } from '../helpers/helpers';
import { FullPerson } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<FullPerson[]>([]);

  useEffect(() => {
    getPeople().then(loadedPeople => setPeople(preparePeople(loadedPeople)));
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
