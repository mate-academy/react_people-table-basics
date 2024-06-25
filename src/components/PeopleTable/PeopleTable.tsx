import React from 'react';
import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

const chooseMotherLink = (person: Person) => {
  if (!person.motherName) {
    return `-`;
  }

  if (person.mother) {
    return <PersonLink person={person.mother} />;
  }

  return `${person.motherName}`;
};

const chooseFatherLink = (person: Person) => {
  if (!person.fatherName) {
    return `-`;
  }

  if (person.father) {
    return <PersonLink person={person.father} />;
  }

  return `${person.fatherName}`;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
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
        {people?.map((person: Person) => {
          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <NavLink
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={`../${person.slug}`}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{chooseMotherLink(person)}</td>
              <td>{chooseFatherLink(person)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
