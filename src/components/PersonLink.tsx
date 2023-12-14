import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
}) => {
  const { slug } = useParams();
  const motherPerson = people.find(item => item.name === person.motherName);
  const fatherPerson = people.find(item => item.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherPerson
          ? (
            <a
              className="has-text-danger"
              href={`#/people/${motherPerson.slug}`}
            >
              {motherPerson.name}
            </a>
          ) : person.motherName || '-'}
      </td>
      <td>
        {fatherPerson
          ? (
            <a
              href={`#/people/${fatherPerson.slug}`}
            >
              {fatherPerson.name}
            </a>
          ) : person.fatherName || '-'}
      </td>
    </tr>
  );
};
