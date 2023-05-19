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

  const motherOfPerson = findPerson(motherName, people);
  const fatherOfPerson = findPerson(fatherName, people);

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
        {motherOfPerson
          ? (
            <Link
              to={`/people/${motherOfPerson.slug}`}
              className={cn({
                'has-text-danger': motherOfPerson?.sex === 'f',
              })}
            >
              {motherName}
            </Link>
          )
          : (motherName || '-')}
      </td>

      <td>
        {fatherOfPerson
          ? (
            <Link
              to={`/people/${fatherOfPerson.slug}`}
            >
              {fatherName}
            </Link>
          )
          : (fatherName || '-')}
      </td>
    </>
  );
};
