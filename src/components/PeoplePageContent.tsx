import { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  getParentLink: (par: string) => Person | undefined;
};

export const PeoplePageContent: FC<Props> = ({ person, getParentLink }) => {
  const generateClassForPerson = () => cn({
    'has-text-danger': person.sex === 'f',
  });

  const { slug } = useParams();

  const getParentContent = (parentName: string) => {
    let result;

    if (getParentLink(parentName)) {
      const parent = getParentLink(parentName);

      result = (
        <td>
          <NavLink
            to={`/people/${parent?.slug}`}
            className={cn({ 'has-text-danger': parent?.sex === 'f' })}
          >
            {parent?.name}
          </NavLink>
        </td>
      );
    }

    if (parentName && !getParentLink(parentName)) {
      result = <td>{parentName}</td>;
    }

    return result;
  };

  const motherContent = person.motherName
    ? getParentContent(person.motherName)
    : <td>-</td>;

  const fatherContent = person.fatherName
    ? getParentContent(person.fatherName)
    : <td>-</td>;

  return (
    <tr
      data-cy="person"
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          className={generateClassForPerson}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {motherContent}
      {fatherContent}
    </tr>
  );
};
