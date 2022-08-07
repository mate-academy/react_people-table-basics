import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

import './PeoplePage.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fillPeopleList = async () => {
      setPeople(await getPeople());
    };

    fillPeopleList().catch((error) => {
      throw new Error(error);
    });
  }, []);

  return (
    <div className="table-container">
      <h2>People page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
