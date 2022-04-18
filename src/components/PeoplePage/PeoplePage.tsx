import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';
import './people-page.scss';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div className="people-page">
      <div className="people-page__content container">
        <h1 className="title">People Page</h1>

        <PeopleTable people={people} />
      </div>
    </div>
  );
});
