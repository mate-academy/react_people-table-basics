import { FC } from 'react';
import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  people: Person[];
}

const findPerson = (personName: string | null, people: Person[]) => {
  return people.find(person => person.name === personName);
};

export const PersonLink: FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const personMother = findPerson(motherName, people);
  const personFather = findPerson(fatherName, people);

  return (
    <>
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>
        {personMother
          ? (
            <Link
              to={`/people/${personMother.slug}`}
              className={cn({
                'has-text-danger': personMother?.sex === 'f',
              })}
            >
              {motherName}
            </Link>
          )
          : (motherName || '-')}
      </td>

      <td>
        {personFather
          ? (
            <Link
              to={`/people/${personFather.slug}`}
            >
              {fatherName}
            </Link>
          )
          : (fatherName || '-')}
      </td>
    </>
  );
};
