import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PeopleTable: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={slug === person.slug
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(mother)
          ? (<PersonLink person={mother} />)
          : (motherName || '-')}
      </td>
      <td>
        {(father)
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
