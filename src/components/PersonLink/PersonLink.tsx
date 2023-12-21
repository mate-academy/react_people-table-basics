import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { mother, father } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother
          ? (<Link className="has-text-danger" to={`../${mother.slug}`}>{mother.name}</Link>)
          : (person.motherName || '-')}
      </td>

      <td>
        {father
          ? (<Link to={`../${father.slug}`}>{father.name}</Link>)
          : (person.fatherName || '-')}
      </td>

    </tr>
  );
};
