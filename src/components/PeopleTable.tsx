import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type PropsLink = {
  to: string;
  person: Person;
};

export const PersonLink: FC<PropsLink> = ({ to, person }) => {
  const location = useLocation().pathname;

  return (
    <tr
      data-cy="person"
      className={(`/people/${person.slug}` === location && 'has-background-warning') || ''}
    >
      <td>
        <NavLink
          to={to}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <NavLink
              to={`/people/${person.mother.slug}`}
              className={classNames(
                { 'has-text-danger': person.mother.sex === 'f' },
              )}
            >
              {person.mother.name}
            </NavLink>
          )
          : person.motherName || '-'}
      </td>
      <td>
        {person.father
          ? (
            <NavLink
              to={`/people/${person.father.slug}`}
            >
              {person.father.name}
            </NavLink>
          )
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              return (
                <PersonLink
                  to={`/people/${person.slug}`}
                  person={person}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
