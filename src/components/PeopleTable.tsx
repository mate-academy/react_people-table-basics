/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const renderParent = (parentName?: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parentObject = people.find(p => p.name === parentName);

    if (parentObject) {
      return <PersonLink person={parentObject} />;
    } else {
      return parentName;
    }
  };

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
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={ isSelected ? 'has-background-warning' : '' }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{renderParent(person.motherName)}</td>
              <td>{renderParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
