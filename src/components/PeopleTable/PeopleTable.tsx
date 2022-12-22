import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { TableHeader } from '../TableHeader';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const tableHeaderValues: string[] = ['Name', 'Sex',
    'Born', 'Died', 'Mother', 'Father'];

  const getParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader values={tableHeaderValues} />

      {people.map(person => (
        <PersonLink
          person={person}
          key={person.slug}
          getParent={getParent}
        />
      ))}
    </table>
  );
};
