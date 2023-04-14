import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map((person) => {
        const mother = people.find(human => human.name === person.motherName);
        const father = people.find(human => human.name === person.fatherName);

        return (
          <PersonInfo
            person={person}
            mother={mother}
            father={father}
            key={person.slug}
          />
        );
      })}
    </>
  );
};
