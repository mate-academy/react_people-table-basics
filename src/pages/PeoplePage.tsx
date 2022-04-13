import {
  memo,
  FC,
  useState,
  useEffect,
} from 'react';
import { getPeople } from '../api/getPeople';
import PeopleTable from '../components/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      const data = await getPeople();

      setPeople(data);
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <PeopleTable people={people} />
    </>
  );
});
