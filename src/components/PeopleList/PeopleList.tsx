import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <PersonInfo
            person={person}
            people={people}
            key={person.slug}
          />
        );
      })}
    </>
  );
};
