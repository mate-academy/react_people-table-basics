import React, { useState, useEffect } from 'react';
import { PeopleTable } from '../PeopleTable';

import { getPeople } from '../../api/people';

import 'bulma';
import './PeoplePage.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((persons) => {
        setPeople(persons);
      });
  }, []);

  return (
    <>
      <div className=" people-page content is-large">
        <h1>People Page</h1>

        <PeopleTable people={people} />
      </div>
    </>
  );
};
