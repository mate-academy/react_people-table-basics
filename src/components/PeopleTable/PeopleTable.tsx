import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';

type Props = {
  people: Person[];
  selectedSlug: string | null;
};

const renderParent = (parentName: string | null, people: Person[]) => {
  if (!parentName) {
    return '-';
  }

  const parent = people.find(p => p.name === parentName);

  return parent ? <PersonLink person={parent} /> : parentName;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
  <table
    className="table is-striped is-hoverable is-narrow is-fullwidth"
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
      {people.map(person => (
        <tr
          key={person.slug}
          data-cy="person"
          className={cn({
            'has-background-warning': selectedSlug === person.slug,
          })}
        >
          <td>
            <PersonLink person={person} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td data-cy="personMother">
            {renderParent(person.motherName, people)}
          </td>
          <td data-cy="personFather">
            {renderParent(person.fatherName, people)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
