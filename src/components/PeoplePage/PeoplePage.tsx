import React, { useEffect, useState } from 'react';
import './PeoplePage.scss';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const response = async () => {
      try {
        const result = await getPeople();

        setPeople(result);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Cant load people from server');
      }
    };

    response();
  }, []);

  return (
    <div className="people-page">
      <h1 className="people-page__title">
        People page
      </h1>

      <PeopleTable
        people={people}
      />
    </div>
  );
};
