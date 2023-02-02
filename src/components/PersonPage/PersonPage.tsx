import { useParams } from 'react-router-dom';
import { memo } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonPage: React.FC<Props> = memo(({ person, people }) => {
  const { slug = '' } = useParams();

  const isSelected = (selectedperson: Person) => selectedperson.slug === slug;

  const findParent = (name: string) => {
    const parent = people.find(pers => pers.name === name);

    return parent
      ? <PersonLink person={parent} />
      : name;
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        // eslint-disable-next-line max-len
        'has-background-warning': isSelected(person),
      })}
      key={person.slug}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName
          ? findParent(person.motherName)
          : (person.motherName || '-')}
      </td>
      <td>
        {person.fatherName
          ? findParent(person.fatherName)
          : (person.fatherName || '-')}
      </td>
    </tr>
  );
});
