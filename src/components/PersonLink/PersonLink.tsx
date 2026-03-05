import React from 'react';
import { Person } from './../../types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;

  const findNameInList = (checkName: string) => {
    return people.find(man => man.name === checkName);
  };

  const fillParentCell = (parentName: string | null) => {
    if (parentName === null) {
      return '-';
    }

    const parent = findNameInList(parentName);

    return parent ? <Link to={parent.slug}>{parentName}</Link> : parentName;
  };

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      <td>
        {/* <Link to={`#/people/${slug}`}>{name}</Link> */}
        <a href="#/people/jan-van-brussel-1714">{name}</a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{fillParentCell(motherName)}</td>
      <td>{fillParentCell(fatherName)}</td>
    </tr>
  );
};
