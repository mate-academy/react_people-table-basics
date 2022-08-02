import { useEffect, useState } from 'react';
import { getPeople } from '../../people';
import PeopleTable from '../PeopleTable/PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const loadPeopleFromServer = async () => {
      const response = await getPeople();

      setPeople(response);
    };

    loadPeopleFromServer();
  }, []);

  return (
    <div>
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
