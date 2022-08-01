import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import PeopleTable from '../PeopleTable/PeopleTable';
import Person from '../../types/Person';

const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [failedPeopleLoading, setFailedPeopleLoading] = useState(false);

  // eslint-disable-next-line max-len
  const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

  function getPeople<T>(): Promise<T> {
    return fetch(BASE_URL)
      .then(res => res.json());
  }

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        const peopleServer = await getPeople<Person[]>();

        setPeople(peopleServer);
      } catch {
        setFailedPeopleLoading(true);
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    (!failedPeopleLoading)
      ? <PeopleTable people={people} />
      : (<p>Failed to Load people</p>)
  );
};

export default PeoplePage;
