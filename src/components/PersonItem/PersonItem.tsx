import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  selectedPerson?: string;
};

export const PersonItem: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (<PersonLink person={mother} />)
          : (motherName || '-')}
      </td>
      <td
        className=""
      >
        {father
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
