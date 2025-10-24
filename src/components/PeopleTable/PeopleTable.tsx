import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import PersonLink from '../PersonLink';

type Props = {
  people: Person[];
};

const TABLE_FIELDS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const NO_PARENT = '-'; // Аж плакати хочеться

const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug: selectedPersonSlug } = useParams();

  const findPersonByName = (name: string | null): Person | undefined => {
    return name ? people.find(person => person.name === name) : undefined;
  };

  const renderParentCell = (name: string | null, parent?: Person) => {
    if (!name) {
      return NO_PARENT;
    }

    if (parent) {
      return <PersonLink person={parent} />;
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
          {TABLE_FIELDS.map(field => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selectedPersonSlug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParentCell(person.motherName, mother)}</td>
              <td>{renderParentCell(person.fatherName, father)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
