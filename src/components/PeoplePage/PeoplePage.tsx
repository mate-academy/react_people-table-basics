import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { getPeopleFromServer } from '../../api/people';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  async function loadPeople() {
    const peopleFromServer = await getPeopleFromServer();

    setPeople([...peopleFromServer]);
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="people-page">
      <h1 className="people-page__title">People Page</h1>
      {people && (
        <PeopleTable people={people} />
      )}
    </div>
  );
};
