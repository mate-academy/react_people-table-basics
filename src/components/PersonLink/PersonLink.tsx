import { Person } from '../../types';
import cn from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, peopleList }) => {
  const { personName } = useParams();

  const normalizePersonName = (name: string) => {
    const born = peopleList.find(persona => persona.name === name)?.born;

    return `${name}  ${born}`.replaceAll(' ', '-').toLowerCase();
  };

  const isPersonExist = (name: string) => {
    return peopleList.some(peple => peple.name === name);
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personName?.includes(
          normalizePersonName(person.name),
        ),
      })}
    >
      <td>
        <a
          href={`#/people/${normalizePersonName(person.name)}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && isPersonExist(person.motherName) ? (
          <a
            className="has-text-danger"
            href={`#/people/${normalizePersonName(person.motherName)}`}
          >
            {person.motherName}
          </a>
        ) : person.motherName ? (
          <p>{person.motherName}</p>
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName && isPersonExist(person.fatherName) ? (
          <a href={`#/people/${normalizePersonName(person.fatherName)}`}>
            {person.fatherName}
          </a>
        ) : person.fatherName ? (
          <p>{person.fatherName}</p>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
