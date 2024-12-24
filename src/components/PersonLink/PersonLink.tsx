import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

interface Props {
  people: Person[];
}
export const PersonLink: React.FC<Props> = props => {
  const { people } = props;

  const peopleWithParents = people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName) || null;
    const father = people.find(dad => dad.name === person.fatherName) || null;

    return { ...person, mother, father };
  });

  const isInTheList = (name: string | null) => {
    if (name === null) {
      return false;
    }

    return people.some(person => person.name === name);
  };

  const { slug } = useParams();

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
        {peopleWithParents.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <NavLink
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
                to={`${person.slug}`}
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {isInTheList(person.motherName) ? (
                <NavLink
                  to={`${person.mother?.slug}`}
                  className={'has-text-danger'}
                >
                  {person.motherName}
                </NavLink>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {isInTheList(person.fatherName) ? (
                <NavLink to={`${person.father?.slug}`}>
                  {person.fatherName}
                </NavLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
