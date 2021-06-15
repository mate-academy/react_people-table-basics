import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    getPeople().then(response => setPeople(response));
  }, []);

  return (
    <>
      <p className="title is-3 is-spaced">People</p>
      {!people
        ? ''
        : <PeopleTable people={people} />
    }
    </>
  );
};
