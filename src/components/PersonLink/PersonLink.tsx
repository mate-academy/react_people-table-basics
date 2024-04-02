import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleContext } from '../PeoplePage';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const people = useContext(PeopleContext);
  const { slug: slugInSearch } = useParams();

  const motherAmongPeople = people.find(human => human.name === motherName);
  const fatherAmongPeople = people.find(human => human.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugInSearch === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherAmongPeople ? (
          <Link
            to={`/people/${motherAmongPeople.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {fatherAmongPeople ? (
          <Link to={`/people/${fatherAmongPeople.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
