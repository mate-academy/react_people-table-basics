import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { ParentLink } from '../ParentLink';

type Props = {
  person: Person;
  selectedPerson: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    father,
    mother,
  },
  selectedPerson,
}) => (
  <tr
    data-cy="person"
    className={cn({
      'has-background-warning': slug === selectedPerson?.slug,
    })}
  >
    <td>
      <Link
        className={cn({ 'has-text-danger': sex === 'f' })}
        to={`../${slug}`}
      >
        {name}
      </Link>
    </td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <ParentLink parent={mother} name={motherName} />
    <ParentLink parent={father} name={fatherName} />
  </tr>
);
