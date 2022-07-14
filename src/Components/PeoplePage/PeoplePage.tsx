import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import 'bulma';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(
    () => {
      getPeople()
        .then(setPeople);
    },
    [],
  );

  return (
    <>
      <h1 className="title">People page</h1>

      <PeopleTable people={people} />
    </>
  );
};
