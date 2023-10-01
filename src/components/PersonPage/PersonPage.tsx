import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SortField } from '../../types/SortField';
import { Sex } from '../../types/Sex';

type Props = {
  people: Person[];
};

export const PersonPage: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getParentsLink = (personName: string | null) => {
    if (!personName) {
      return '-';
    }

    const parent = people.find(({ name }) => name === personName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return personName;
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {Object.keys(SortField).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        {people.map((person) => (
          <tbody key={person.slug}>
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={person.slug}
                  className={classNames({
                    'has-text-danger': person.sex === Sex.Female,
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{getParentsLink(person.motherName)}</td>
              <td>{getParentsLink(person.fatherName)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};
