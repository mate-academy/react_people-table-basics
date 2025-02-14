import React from 'react';
import { Person } from '../../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  activeSlug?: string;
  getParent?: (parentName: string | null) => Person | undefined;
};

export const PersonItem: React.FC<Props> = ({
  person,
  activeSlug = '',
  getParent = () => undefined,
}) => {
  const isActive = activeSlug === person.slug;

  const renderHuman = (human: Person | string | null) => {
    if (!human) {
      return '-';
    }

    if (typeof human === 'string') {
      return human;
    }

    const linkTo =
      isActive && human.slug === person.slug ? '' : `../${human.slug}`;
    const isFemale = human.sex === 'f';

    return human.slug ? (
      <Link to={linkTo} className={classNames({ 'has-text-danger': isFemale })}>
        {human.name}
      </Link>
    ) : (
      human.name
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isActive,
      })}
    >
      <td>{renderHuman(person)}</td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderHuman(getParent(person.motherName) || person.motherName)}</td>
      <td>{renderHuman(getParent(person.fatherName) || person.fatherName)}</td>
    </tr>
  );
};
