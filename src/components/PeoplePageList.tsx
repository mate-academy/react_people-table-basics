import { Person } from '../types';
import { PeoplePageListItem } from './PeoplePageListItem';

type Props = {
  people: Person[];
}

export const PeoplePageList: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(person => (
        <PeoplePageListItem person={person} key={person.slug} people={people} />
      ))}
    </>
  );
};
