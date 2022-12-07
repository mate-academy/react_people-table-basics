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

  const {
    sex,
    name,
    born,
    died,
    motherName,
    fatherName,
  } = person;

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
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParent(motherName)}</td>
      <td>{findParent(fatherName)}</td>
    </tr>
  );
};
