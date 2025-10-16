import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow = ({ person, people }: Props) => {
  const { slug } = useParams();
  const isSelected = slug === person.slug;

  const mother = people.find(
    per =>
      `${person.motherName?.toLowerCase().trim().replaceAll(' ', '-')}-${per.born}` ===
      per.slug,
  );

  const father = people.find(
    per =>
      `${person.fatherName?.toLowerCase().trim().replaceAll(' ', '-')}-${per.born}` ===
      per.slug,
  );

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : person.motherName || '-'}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : person.fatherName || '-'}
      </td>
    </tr>
  );
};
