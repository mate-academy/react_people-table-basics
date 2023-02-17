import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const personSlug = useParams();
  const isSelected = (slug: string) => {
    return personSlug.slug === slug;
  };

  const findParent = (name: string | null) => {
    const parent = people.find((person) => person.name === name);

    return parent ? <PersonLink person={parent} /> : name || '-';
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
        {people.map((person: Person) => {
          const { name, sex, born, died, fatherName, motherName, slug } =
            person;

          return (
            <tr
              data-cy="person"
              key={name}
              className={cn({
                'has-background-warning': isSelected(slug),
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findParent(motherName)}</td>
              <td>{findParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
