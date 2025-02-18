import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

type Props = {
  person: Person;
};
export const PersonItem: React.FC<Props> = ({ person }) => {
  const { sex, born, died, slug, motherName, fatherName, mother, father } =
    person;
  const { selectedSlug } = useParams();

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedSlug,
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
