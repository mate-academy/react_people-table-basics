import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  name: string;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, peopleList }) => {
  const person = peopleList.find(p => p.name === name);

  if (!person) {
    return <>{name || '-'}</>;
  }

  const slug = `${person.name} ${person.born ?? ''}`
    .trim()
    .replace(/\s+/g, '-')
    .replace(/,/g, '-')
    .toLowerCase();

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

/*import React from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  peopleList: Person[];
};
export const PersonLink: React.FC<Props> = ({ person, peopleList }) => {
  const { personName } = useParams();
  const normalizedName = (name: string) => {
    const born = peopleList.find(personage => personage.name === name)?.born;

    return `${name} ${born ?? ''}`
      .trim()
      .replaceAll(',', '-')
      .replaceAll(' ', '-')
      .toLowerCase();
  };

  const isPerson = (name: string) => {
    return peopleList.some(personage => personage.name === name);
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personName === normalizedName(person.name),
      })}
    >
      <td>
        <Link
          to={`/people/${normalizedName(person.name)}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && isPerson(person.motherName) ? (
          <Link
            className="has-text-danger"
            to={`/people/${normalizedName(person.motherName)}`}
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          <p>{person.motherName}</p>
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName && isPerson(person.fatherName) ? (
          <Link to={`/people/${normalizedName(person.fatherName)}`}>
            {person.fatherName}
          </Link>
        ) : person.fatherName ? (
          <p>{person.fatherName}</p>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};*/
