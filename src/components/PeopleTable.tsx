import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  slug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const handleParentCellContent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parentName && parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    if (parentName && !parent) {
      return parentName;
    }

    return '-';
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames(
              {
                'has-background-warning': person.slug === slug,
              },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{handleParentCellContent(person.motherName)}</td>
            <td>{handleParentCellContent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
