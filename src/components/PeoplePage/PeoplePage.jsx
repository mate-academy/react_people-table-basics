import React, { useState, useEffect } from 'react';

import './PeoplePage.scss';

import { getPeople } from '../../api/people';

import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people}/>
    </>
  );
};
