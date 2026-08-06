import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

interface PeopleTabsProps {
  people: Person[];
}

export const PeopleTabs = ({ people }: PeopleTabsProps) => {
  const { slug: selectedSlug } = useParams();

  return people.map(person => {
    const { sex, born, died, motherName, fatherName, name, slug } = person;

    const mother = people.find(parents => parents.name === motherName);
    const father = people.find(parents => parents.name === fatherName);

    const isSelected = slug === selectedSlug;

    return (
      <tr
        data-cy="person"
        key={name}
        className={classNames({
          'has-background-warning': isSelected,
        })}
      >
        <td>{<PersonLink person={person} />}</td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {!motherName ? (
            '-'
          ) : mother ? (
            <PersonLink person={mother} />
          ) : (
            motherName
          )}
        </td>
        <td>
          {!fatherName ? (
            '-'
          ) : father ? (
            <PersonLink person={father} />
          ) : (
            fatherName
          )}
        </td>
      </tr>
    );
  });
};
