import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ParentInfo } from './ParentInfo';
import { PersonLink } from './PersonLink';
import { Person as PersonType } from '../../types';

type Props = {
  person: PersonType
};

export const Person: FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const {
    slug,
    name,
    sex,
    born,
    died,
    fatherName = null,
    motherName = null,
    father,
    mother,
  } = person;

  const hasWarning = slug === personSlug;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': hasWarning,
      })}
    >
      <td>
        <PersonLink to={`/people/${slug}`} name={name} sex={sex} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <ParentInfo parent={mother} name={motherName} />
      </td>
      <td>
        <ParentInfo parent={father} name={fatherName} />
      </td>
    </tr>
  );
};
