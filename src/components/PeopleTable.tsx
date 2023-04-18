import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export interface Props {
  people: Person[],
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: selectedSlug = '' } = useParams();

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return parent;
    }

    return parentName;
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
          return (
            <tr
              key={person.name}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': person.slug === selectedSlug },
              )}
            >
              <PersonLink
                person={person}
                mother={getParent(person.motherName)}
                father={getParent(person.fatherName)}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
