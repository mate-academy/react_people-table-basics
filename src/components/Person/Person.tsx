import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonType } from '../../types';
import { GENDER_FEMALE, NOT_SET_VALUE } from '../../utils/consts';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: PersonType,
};

export const Person: React.FC<Props> = ({ person }) => {
  const isFemale = person.sex === GENDER_FEMALE;
  const {
    slug,
    name,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={slug}
          className={classNames({
            'has-text-danger': isFemale,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || NOT_SET_VALUE
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || NOT_SET_VALUE
        )}
      </td>
    </tr>
  );
};
