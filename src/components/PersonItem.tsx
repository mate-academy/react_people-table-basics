import classNames from 'classnames';
import { useParams, NavLink } from 'react-router-dom';

import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[],
  person: Person,
};

export const PersonItem: React.FC<Props> = ({ people, person }) => {
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
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
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
