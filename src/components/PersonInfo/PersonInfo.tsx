import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonInfo: FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;
  const { slug: selectedPersonSlug } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': selectedPersonSlug === slug,
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
      <td>
        {father
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
