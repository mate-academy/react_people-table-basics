import cn from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PeopleItem: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const findParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(findPerson => findPerson.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName;
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{findParent(person.motherName)}</td>
      <td>{findParent(person.fatherName)}</td>
    </tr>
  );
};
