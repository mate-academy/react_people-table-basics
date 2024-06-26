import React from 'react';
import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { chooseFatherLink, chooseMotherLink } from '../../utils/functions';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { urlSlug } = useParams();

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

          const { name, slug, sex, born, died } = person;

          return (
            <tr
              data-cy="person"
              key={name}
              className={classNames({
                'has-background-warning': urlSlug === slug,
              })}
            >
              <td>
                <NavLink
                  className={classNames({'has-text-danger': sex === 'f'})}
                  to={`../${slug}`}
                >
                  {name}
                </NavLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{chooseMotherLink(person)}</td>
              <td>{chooseFatherLink(person)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
