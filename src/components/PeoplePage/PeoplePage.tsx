import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import PeopleTable from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const peopleFromServer = async () => {
    const respPeople = await getPeople();

    setPeople(respPeople);
  };

  useEffect(() => {
    peopleFromServer();
  }, []);

  return (
    <>
      <h2 className="people__title">People page</h2>
      <PeopleTable people={people} />
    </>
  );
};

export default PeoplePage;
