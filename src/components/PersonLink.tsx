import { FC } from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: FC<Props> = ({ person }) => {
  const { slugParam } = useParams();
  const { slug, motherName, mother, fatherName, father } = person;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({ 'has-background-warning': slug === slugParam })}
    >
      <td>
        <Link
          to={`${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother?.slug ? (
          <Link to={mother.slug} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father?.slug ? (
          <Link to={father.slug}>{fatherName}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
