import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonPage: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={
        cn({
          'has-background-warning': selectedPerson === person.slug,
        })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          ) : (
            motherName || '-'
          )}
      </td>
      <td>
        {father
          ? (
            <PersonLink person={father} />
          ) : (
            fatherName || '-'
          )}
      </td>
    </tr>
  );
};
