import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonInfo: FC<Props> = ({
  person,
  people,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;
  const { personSlug = '' } = useParams();

  const mother = people.find(({ name }) => name === motherName);
  const father = people.find(({ name }) => name === fatherName);

  return (
    <tr
      key={slug}
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
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};
