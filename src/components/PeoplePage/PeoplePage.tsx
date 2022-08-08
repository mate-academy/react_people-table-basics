import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import PeopleTable from '../PeopleTable/PeopleTable';
import Person from '../../types/Person';
import { getPeople } from '../../api';

const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [failedPeopleLoading, setFailedPeopleLoading] = useState(false);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        const peopleServer = await getPeople();

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
