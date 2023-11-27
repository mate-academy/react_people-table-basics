import { useContext } from 'react';
import { PeopleContext } from '../../PeopleContext';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleList: React.FC = () => {
  const { people } = useContext(PeopleContext);

  return (
    <tbody>
      {people?.map(person => {
        return (
          <PersonLink person={person} key={person.slug} />
        );
      })}
    </tbody>
  );
};
