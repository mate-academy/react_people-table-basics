import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();

  const getParentLink = (name: string) => {
    const parent = people.find(par => par.name === name);

    if (parent) {
      return (
        <PersonLink
          person={parent}
        />
      );
    }

    return name;
  };

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
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
          } = person;

          const motherContent = motherName
            ? getParentLink(motherName)
            : '-';

          const fatherContent = fatherName
            ? getParentLink(fatherName)
            : '-';

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': person.slug === slugId,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherContent}</td>
              <td>{fatherContent}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
