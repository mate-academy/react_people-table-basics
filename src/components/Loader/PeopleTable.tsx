import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug?: string }>();

  const findPersonByName = (name: string): Person | null => {
    if (!name) return null;

    const foundPerson = people.find(person => person.name === name);

    return foundPerson || null;
  };

  const renderParentCell = (parentName: string | null) => {
    if (!parentName) return '-';

    const parentPerson = findPersonByName(parentName);

    if (parentPerson) {
      return <PersonLink person={parentPerson} />;
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
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParentCell(person.motherName)}</td>
              <td>{renderParentCell(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
