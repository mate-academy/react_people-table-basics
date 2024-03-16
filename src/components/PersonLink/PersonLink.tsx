import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

function getParentsLink(parents?: Person, parentsName?: string | null) {
  if (parents) {
    return (
      <NavLink
        to={parents.slug}
        className={classNames({ 'has-text-danger': parents.sex === 'f' })}
      >
        {parents.name}
      </NavLink>
    );
  }

  if (parentsName) {
    return parentsName;
  }

  return '-';
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const {
    name,
    sex,
    born,
    died,
    slug,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  const motherLink = getParentsLink(mother, motherName);
  const fatherLink = getParentsLink(father, fatherName);

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': personId === slug,
        })}
      >
        <td>
          <NavLink
            to={person.slug}
            className={classNames({ 'has-text-danger': sex === 'f' })}
          >
            {name}
          </NavLink>
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{motherLink}</td>
        <td>{fatherLink}</td>
      </tr>
    </>
  );
};
