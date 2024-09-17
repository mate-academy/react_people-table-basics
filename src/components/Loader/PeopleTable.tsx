import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  slug?: string;
};

const personSlug = (person: Person) => {
  return `${person.name.toLowerCase().replace(/ /g, '-')}-${person.born}`;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
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
        {people.map((person: Person) => {
          const renderParent = (parentName: string | null) => {
            if (!parentName) {
              return '-';
            }

            const parent = people.find(p => p.name === parentName);

            if (parent) {
              return <PersonLink person={parent} />;
            }

            return parentName;
          };

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': personSlug(person) === slug,
              })}
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
