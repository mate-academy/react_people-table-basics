import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();

  const peopleByName = new Map<string, Person>();

  people.forEach(p => peopleByName.set(p.name, p));

  const renderParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = peopleByName.get(parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-fullwidth is-striped is-hoverable"
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
          const isSelected = person.slug === slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected,
              })}
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
