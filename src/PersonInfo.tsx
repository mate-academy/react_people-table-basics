import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './types';
import { PersonLink } from './PersonLink';
import { PersonParants } from './types/PersonParants';

export interface Props {
  person: Person;
  personParants: PersonParants;
}

export const PersonInfo: React.FC<Props> = ({ person, personParants }) => {
  const { slug } = useParams();
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
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
