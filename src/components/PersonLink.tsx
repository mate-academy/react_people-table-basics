import classNames from 'classnames';
import { Person } from '../types';
import { Link, NavLink, useParams } from 'react-router-dom';
import { isParentsExist } from '../utils/utils';
import { Sex } from '../types/enum';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const { personInfo } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': personInfo === slug })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === Sex.f })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother && mother.sex === Sex.f ? (
        <td>
          <Link
            to={`/people/${mother.slug}`}
            className={classNames({
              'has-text-danger': mother && mother.sex === Sex.f,
            })}
          >
            {isParentsExist(motherName)}
          </Link>
        </td>
      ) : (
        <td>{isParentsExist(motherName)}</td>
      )}

      {father && father.sex === Sex.m ? (
        <td>
          <Link to={`/people/${father.slug}`}>
            {isParentsExist(fatherName)}
          </Link>
        </td>
      ) : (
        <td>{isParentsExist(fatherName)}</td>
      )}
    </tr>
  );
};
