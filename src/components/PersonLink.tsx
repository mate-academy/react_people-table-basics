import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  checkPersonName: (motherName: string | null) => Person | null;
};

export const PersonLink: FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  },
  checkPersonName,
}) => {
  const hasMotherInList = checkPersonName(motherName);
  const hasFatherInList = checkPersonName(fatherName);
  const { slug: currentSlug = '' } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': currentSlug === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {hasMotherInList ? (
          <Link to={`/people/${hasMotherInList.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {hasFatherInList ? (
          <Link to={`/people/${hasFatherInList.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
