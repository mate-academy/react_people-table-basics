import { useEffect, useState } from 'react';
import { getPeople } from '../../Api/people';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(peoplesFromServer => setPeople(peoplesFromServer
      .map((human: Person) => ({
        ...human,
        id: peoplesFromServer.indexOf(human),
        mother: peoplesFromServer
          .find((mom: Person) => mom.name === human.motherName)
          || 'cannot found Mom',
        father: peoplesFromServer
          .find((dad: Person) => dad.name === human.fatherName)
          || 'cannot found Dad',
      }))));
  }, []);

  return (
    <div className="page__people">
      {people ? (
        <PeopleTable humans={people} />
      ) : (
        <p>People Not Found</p>
      )}
    </div>
  );
};
