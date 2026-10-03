import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

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
        {people.map(person => {
          const { name, sex, born, died, motherName, fatherName, slug } =
            person;
          const isSelected = slug === selectedSlug;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink name={name} people={people} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                <PersonLink name={motherName} people={people} />
              </td>
              <td>
                <PersonLink name={fatherName} people={people} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
