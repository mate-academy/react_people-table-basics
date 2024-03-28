import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonTable: React.FC<Props> = ({ person, people }) => {
  const { died, born, name, sex, fatherName, motherName } = person;
  const { slug } = useParams();

  const mother = people.find(motherPerson => motherPerson.name === motherName);
  const father = people.find(fatherPerson => fatherPerson.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`../${person.slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link className="has-text-danger" to={`../${mother.slug}`}>
            {motherName}
          </Link>
        ) : (
          `${motherName || '-'}`
        )}
      </td>

      <td>
        {father ? (
          <Link to={`../${father.slug}`}>{fatherName}</Link>
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
