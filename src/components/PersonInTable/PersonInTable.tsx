import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableLink } from '../TableLink';

type Props = {
  person: Person;
};

export const PersonInTable: FC<Props> = ({ person }) => {
  const {
    born,
    died,
    fatherName,
    father,
    motherName,
    mother,
    sex,
    slug,
  } = person;

  const { personId } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames(
        { 'has-background-warning': personId === slug },
      )}
    >
      <td>
        <TableLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <TableLink person={mother} />
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <TableLink person={father} />
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
