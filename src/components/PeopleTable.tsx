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

  const parents = (parentName: string | null) => {
    const parent = people.find((person) => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName || '-';
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
                  <PersonLink
                    person={person}
                  />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {parents(motherName)}

                </td>
                <td>
                  {parents(fatherName)}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
