import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
  father?: Person | undefined;
  mother?: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { died, born, name, sex, fatherName, motherName } = person;
  const { slug } = useParams();

  const fatherPerson = people.find(father => father.name === fatherName);
  const motherPerson = people.find(mother => mother.name === motherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherPerson ? (
          <Link className="has-text-danger" to={`../${motherPerson.slug}`}>
            {motherName}
          </Link>
        ) : (
          `${motherName || '-'}`
        )}
      </td>

      <td>
        {fatherPerson ? (
          <Link to={`../${fatherPerson.slug}`}>{fatherName}</Link>
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
