import React, { useEffect, useState } from 'react';
import './PeoplePage.scss';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../api/getPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    fetchPeople().then(r => r);
  }, []);

  return (
    <div className="wrapper">
      <h1 className="pp__title">People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
