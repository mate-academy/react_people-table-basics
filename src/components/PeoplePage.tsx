import {
  FC, useState, useEffect, memo,
} from 'react';
import { getPeople } from '../data';
import PeopleTable from './PeopleTable';

const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return <PeopleTable people={people} />;
});

export default PeoplePage;
