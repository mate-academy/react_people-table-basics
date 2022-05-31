import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[] | null>([]);

  const peopleFromServer = async () => {
    const getPeoples = await getPeople();

    setPeople(getPeoples);
  };

  useEffect(() => {
    peopleFromServer();
  }, []);

  return (
    <>
      <h1>
        People Page
      </h1>
      <div className="Wrapper">
        {people && (
          <PeopleTable people={people} />
        )}
      </div>
    </>
  );
};
