import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, slug, mother, father } =
    person;
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
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
        {(!motherName && '-') ||
          (!mother ? motherName : <PersonLink person={mother} />)}
      </td>
      <td>
        {(!fatherName && '-') ||
          (!father ? fatherName : <PersonLink person={father} />)}
      </td>
    </tr>
  );
};
