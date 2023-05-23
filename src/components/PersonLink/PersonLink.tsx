import classnames from 'classnames';
import { FC } from 'react';
import { Link, Link as NavLink } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
  people: Person[],
}

export const PersonLink:FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const findMother = people
    .find(({ name: personName }) => personName === motherName);

  const findFather = people
    .find(({ name: personName }) => personName === fatherName);

  return (
    <>
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={classnames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>
        {findMother
          ? (
            <Link
              to={`/people/${findMother.slug}`}
              className={classnames({
                'has-text-danger': findMother?.sex === 'f',
              })}
            >
              {motherName}
            </Link>
          )
          : (motherName || '-')}
      </td>

      <td>
        {findFather
          ? (
            <Link
              to={`/people/${findFather.slug}`}
            >
              {fatherName}
            </Link>
          )
          : (fatherName || '-')}
      </td>
    </>
  );
};
