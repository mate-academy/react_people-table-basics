import { Person } from '../../types';
import { PersonLink } from '../Person';

type Props = {
  people: Person[];
};

export const PeopleTableBody: React.FC<Props> = ({ people }) => (
  <tbody>
    {people.map(person => (
      <PersonLink person={person} key={person.slug} people={people} />
    ))}
  </tbody>
);
