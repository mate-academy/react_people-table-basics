import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './types';
import { PersonLink } from './PersonLink';
import { PersonParants } from './components/PersonParants';

export interface Props {
  person: Person;
  personParants: PersonParants;
}

export const PersonInfo: React.FC<Props> = ({ person, personParants }) => {
  const { personSlug } = useParams();
  const {
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {personParants.mother
          ? <PersonLink person={personParants.mother} />
          : motherName || '-'}
      </td>
      <td>
        {personParants.father
          ? <PersonLink person={personParants.father} />
          : fatherName || '-'}
      </td>

    </tr>
  );
};
