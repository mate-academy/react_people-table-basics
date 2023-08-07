/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
};

function getPerson(name: string | null, people: Person[]) {
  return people.find(person => person.name === name) || null;
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const father = useMemo(() => {
    return getPerson(person.fatherName, people);
  }, []);

  const mother = useMemo(() => {
    return getPerson(person.motherName, people);
  }, []);

  return (
    <>
      <td>
        <Link
          to={`../${person?.slug}`}
          className={classNames(null,
            { 'has-text-danger': person?.sex === 'f' })}
        >
          {person?.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName
          ? (
            mother
              ? (
                <Link
                  to={`../${mother.slug}`}
                  className="has-text-danger"
                >
                  {mother.name}
                </Link>
              )
              : person.motherName
          )
          : '-'}
      </td>
      <td>
        {person.fatherName
          ? (
            father
              ? (
                <Link
                  to={`../${father.slug}`}
                >
                  {father.name}
                </Link>
              )
              : person.fatherName
          )
          : '-'}
      </td>
    </>
  );
};
