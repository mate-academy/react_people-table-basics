import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { DEFAULT_VALUE } from '../../utills/constants';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    sex,
    slug,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
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
          ? <PersonLink person={mother} />
          : motherName || DEFAULT_VALUE}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || DEFAULT_VALUE}
      </td>
    </tr>
  );
};
