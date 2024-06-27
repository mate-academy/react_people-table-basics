import { useContext } from 'react';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { PeopleContext } from '../../peopleContext';

export const PeopleList = () => {
  const { people } = useContext(PeopleContext);

  return (
    <tbody>
      {people.map((person, _, array) => {
        const motherLink = array.find(
          item => person.motherName === item.name,
        );
        const fatherLink = array.find(
          item => person.fatherName === item.name,
        );

        return (
          <PeopleItem
            key={person.slug}
            person={person}
            motherLink={motherLink}
            fatherLink={fatherLink}
          />
        );
      })}
    </tbody>
  );
};
