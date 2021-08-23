import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

function findParents(person, list) {
  const mother = list.find(obj => obj.name === person.motherName);
  const father = list.find(obj => obj.name === person.fatherName);

  return {
    ...person, mother, father,
  };
}

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((json) => {
      setPeople(json.map(person => findParents(person, json)));
    });
  }, []);

  return !people.length
    ? <CircularProgress />
    : <PeopleTable people={people} />;
};
