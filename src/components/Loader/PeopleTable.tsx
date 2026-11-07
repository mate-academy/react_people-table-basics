import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();

  const peopleByName = new Map<string, Person>();

  people.forEach(person => {
    peopleByName.set(person.name, person);
  });

  const renderParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parentPerson = peopleByName.get(parentName);

    if (parentPerson) {
      return <PersonLink person={parentPerson} />;
    }

    return parentName;
  };

  return (
    <table
      className="table is-fullwidth is-striped is-hoverable"
      data-cy="peopleTable"
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

          const renderParentCell = (parentName: string | null) => (
            <td>{renderParent(parentName)}</td>
          );

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
              {renderParentCell(person.motherName)}
              {renderParentCell(person.fatherName)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
