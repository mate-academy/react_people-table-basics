import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const personSlug = useParams();
  const isSelected = (slug: string) => {
    return personSlug.slug === slug;
  };

  const parents = (parentName: string | null, parentRole: string) => {
    const parent = people.find((person) => person.name === parentName);
    let className = '';

    if (parent) {
      if (parentRole === 'mother') {
        className = 'has-text-danger';
      }

      return (
        <PersonLink person={parent} className={className} />
      );
    }

    if (!parent) {
      return parentName || '-';
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
        {
          people.map((person: Person) => {
            const {
              name,
              sex,
              born,
              died,
              fatherName,
              motherName,
              slug,
            } = person;

            return (
              <tr
                data-cy="person"
                key={name}
                className={classNames({
                  'has-background-warning': isSelected(slug),
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {parents(motherName, 'mother')}

                </td>
                <td>
                  {parents(fatherName, 'father')}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
