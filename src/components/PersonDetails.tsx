import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonDetails: React.FC<Props> = ({ person }) => {
  const { slugParam } = useParams();
  const { sex, born, died, mother, father, slug, motherName, fatherName } =
    person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugParam === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
