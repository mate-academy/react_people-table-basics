import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type PersonLinkProps = {
  people:Person[];
  personName:string | null;
};

export const PersonLink: FC<PersonLinkProps> = ({ people, personName }) => {
  const person = people.find(human => human.name === personName);

  if (!personName) {
    return (<td>-</td>);
  }

  if (person) {
    return (
      <td>
        <NavLink
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>
    );
  }

  return (<td>{personName}</td>);
};
