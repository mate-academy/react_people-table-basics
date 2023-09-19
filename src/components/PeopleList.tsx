import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people : Person[],
};

export const PeopleList:React.FC<Props> = ({ people }) => {
  const { slugPerson } = useParams();

  const getPersonName = (name: string | null) => {
    if (!name) {
      return undefined;
    }

    return people.find(person => person.name === name);
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
        {people.map(({
          name, sex, born, died, slug, fatherName, motherName,
        }) => {
          const mother = getPersonName(motherName);
          const father = getPersonName(fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === slugPerson,
              })}
            >
              <td>
                <PersonLink person={({
                  name, sex, born, died, slug, fatherName, motherName,
                })}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || <span>-</span> }
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || <span>-</span> }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
