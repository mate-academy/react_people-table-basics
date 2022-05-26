import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const receivePeopleFromServer = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    receivePeopleFromServer();
  }, []);

  return (
    <div className="people">
      <h2 className="people__title">People page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
