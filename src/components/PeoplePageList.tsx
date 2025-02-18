import { useValues } from '../PeopleContext';
import { PeoplePageListItem } from './PeoplePageListItem';

export const PeoplePageList: React.FC = () => {
  const { people } = useValues();

  return (
    <>
      {people.map(person => (
        <PeoplePageListItem person={person} key={person.slug} />
      ))}
    </>
  );
};
