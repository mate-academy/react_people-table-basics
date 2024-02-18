import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const getLinkPerson = (name: string) => {
    const foundPerson = people.find((p: Person) => p.name === name);

    if (foundPerson) {
      return (
        <Link
          className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
          to={`/people/${foundPerson.slug}`}
        >
          {name}
        </Link>
      );
    }

    return name;
  };

  return (
    <>
      <td>{getLinkPerson(person.name)}</td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getLinkPerson(person.motherName || '-')}</td>
      <td>{getLinkPerson(person.fatherName || '-')}</td>
    </>
  );
};
