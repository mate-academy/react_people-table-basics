import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  peopleByName: Map<string, Person>;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  peopleByName,
}) => {
  const renderRelativeCell = (relativeName?: string | null) => {
    if (!relativeName) {
      return '-';
    }

    const relatedPerson = peopleByName.get(relativeName);

    if (!relatedPerson) {
      return relativeName;
    }

    return <PersonLink person={relatedPerson} />;
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
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died || '-'}</td>
            <td>{renderRelativeCell(person.motherName)}</td>
            <td>{renderRelativeCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
