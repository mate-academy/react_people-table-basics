import { useEffect, useState } from 'react';
import { getPeople } from '../api';
// eslint-disable-next-line import/no-named-as-default
import PeopleTable from '../PeopleTable/PeopleTable';
import People from '../types/People';

const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [errorGettingPeople, setErrorGettingPeople] = useState(false);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        const peopleServer = await getPeople<People[]>();

        setPeople(peopleServer);
      } catch {
        setErrorGettingPeople(true);
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    (!errorGettingPeople)
      ? <PeopleTable people={people} />
      : (<p>Failed to Load people</p>)
  );
};

export default PeoplePage;
