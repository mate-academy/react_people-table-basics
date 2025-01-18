import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ContextPeople } from '../../Contexts/ContextPeople';

type Props = {
  name: string;
};

export const PersonLink: React.FC<Props> = ({ name }) => {
  const { peopleFromServer } = useContext(ContextPeople);
  const person = peopleFromServer.find(
    personFromServer => personFromServer.name === name,
  );

  if (!person) {
    return <span>{name}</span>;
  }

  const link = [...name.toLowerCase().split(' '), person.born].join('-');

  return (
    <Link
      to={`/people/${link}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
