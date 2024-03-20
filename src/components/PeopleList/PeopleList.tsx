import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  return (
    <tbody>
      {people.map(person => (
        <PersonInfo key={person.slug} person={person} people={people} />
      ))}
    </tbody>
  );
};
