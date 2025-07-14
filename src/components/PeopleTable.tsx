import { Person } from '../types';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  people: Person[] | null;
  personToHighlight: Person | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  personToHighlight,
}) => {
  const getParent = (parentName: string | null | undefined) =>
    parentName ? people?.find(p => p.name === parentName) || parentName : null;

  const renderParent = (parent: Person | string | null) =>
    !parent ? (
      '-'
    ) : typeof parent === 'string' ? (
      parent
    ) : (
      <PersonLink person={parent} />
    );

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
        {people?.map(person => {
          // Остановился тут!!!
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          const isHighlighted =
            personToHighlight && person.name === personToHighlight.name;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isHighlighted ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{renderParent(mother)}</td>
              <td>{renderParent(father)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
