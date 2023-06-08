import { useParams } from 'react-router-dom';
import PersonLink from '../PersonLink/PersonLink';
import { PersonProps } from '../../types';

interface Props {
  person: PersonProps
}

export default function Person({ person }: Props) {
  const { selectedPerson } = useParams();

  const {
    born,
    died,
    father,
    fatherName,
    mother,
    motherName,
    sex,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={selectedPerson === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother && person.mother
          ? <PersonLink person={person.mother} />
          : (motherName || '-')}
      </td>
      <td>
        {father && person.father
          ? <PersonLink person={person.father} />
          : (fatherName || '-')}
      </td>
    </tr>
  );
}
