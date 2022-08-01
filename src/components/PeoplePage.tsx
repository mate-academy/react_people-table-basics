import { useEffect, useState } from 'react';
import { Person } from './types/Person';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const peopleForTable = [...peopleFromServer]
        .map(personfromServer => {
          return ({
            ...personfromServer,
            mother: peopleFromServer
              .find(person => personfromServer.motherName === person.name)
              || null,
            father: peopleFromServer
              .find(person => personfromServer.fatherName === person.name)
              || null,
          });
        });

      setPeople(peopleForTable);
    });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} />
    </>
  );
};
