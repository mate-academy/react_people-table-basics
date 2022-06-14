import React, { useState, useEffect } from 'react';
import './PeoplePage.scss';
import { getPeople } from '../../api/getPeople';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleData => {
        setPeople(peopleData);
      });
  }, []);

  return (
    <div className="people-page">
      <h1 className="people-page__title">People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
