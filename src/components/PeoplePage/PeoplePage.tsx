import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable/PeopleTable';
import { getPeople } from '../../api/people';
import { NewPerson } from '../../react-app-env';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<NewPerson[]>([]);
  const [visiblePeople, setVisiblePeople] = useState(false);

  const getPreparePeople = async () => {
    const peopleFromServer = await getPeople();

    const peopleWithMotherFather = peopleFromServer
      .map((person: { motherName: string; fatherName: string }) => ({
        ...person,
        mother: peopleFromServer.find((mother: { name: string; }) => (
          mother.name === person.motherName)) || null,
        father: peopleFromServer.find((father: { name: string; }) => (
          father.name === person.fatherName)) || null,
      }));

    setPeople(peopleWithMotherFather);
    setVisiblePeople(true);
  };

  useEffect(() => {
    getPreparePeople();
  }, []);

  return (
    <div>
      <h1>People Page</h1>
      {visiblePeople ? (
        <PeopleTable people={people} />
      ) : (
        'Loading...'
      )}

    </div>
  );
};
