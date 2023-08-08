import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParentForPeople = useMemo(() => {
    const temp = people.map(person => ({
      ...person,
      mother: people.find(mother => mother.name === person.motherName) || null,
      father: people.find(father => father.name === person.fatherName) || null,
    }));

    return temp;
  }, [people]);

  const { slug } = useParams();

  const parentLinks = useCallback((
    parentName: string | null,
    parentInfo: Person | null,
  ) => {
    if (!parentName && !parentInfo) {
      return '-';
    }

    if (parentInfo) {
      return <PersonLink person={parentInfo} />;
    }

    return parentName;
  }, []);

  return (
    <>
      <table
        data-cy="peopleTable"
        className="
    table
    is-striped
    is-hoverable
    is-narrow
    is-fullwidth"
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
          {findParentForPeople.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning':
            slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {parentLinks(person.motherName, person.mother)}
              </td>
              <td>
                {parentLinks(person.fatherName, person.father)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
