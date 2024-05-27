import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

const FEMALE = 'f';
const MISSING_PARENT = '-';

const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;
  const { userSlug } = useParams();
  const selectedUser = userSlug === slug;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': selectedUser,
      })}
    >
      <td>
        <Link
          to={`../people/${slug}`}
          className={classNames({ 'has-text-danger': sex === FEMALE })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : motherName || MISSING_PARENT}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || MISSING_PARENT}
      </td>
    </tr>
  );
};

export default PersonInfo;
