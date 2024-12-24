import React, { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

import { Link, useParams } from 'react-router-dom';

import { Person } from '../types';
import { findChild } from '../helpers/peopleHelper';

import cn from 'classnames';
import { Sex } from '../types/Sex';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);
  const { sex, born, died, name, motherName, fatherName } = person;

  const childByMother = motherName ? findChild(people, motherName) : null;
  const childByFather = fatherName ? findChild(people, fatherName) : null;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={person.slug}
          className={cn({ 'has-text-danger': sex === Sex.F })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {!motherName && <td>-</td>}
      {motherName &&
        (!childByMother ? (
          <td>{motherName}</td>
        ) : (
          <td>
            <Link className="has-text-danger" to={childByMother.slug}>
              {motherName}
            </Link>
          </td>
        ))}
      {!fatherName && <td>-</td>}
      {fatherName &&
        (!childByFather ? (
          <td>{fatherName}</td>
        ) : (
          <td>
            <Link to={childByFather.slug}>{fatherName}</Link>
          </td>
        ))}
    </tr>
  );
};
