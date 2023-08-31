import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person,
  peoples: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, peoples }) => {
  const { slug } = useParams();
  const hasFather = peoples.find(parent => parent.name === person.fatherName);
  const hasMather = peoples.find(parent => parent.name === person.motherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <NavLink
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {!hasMather ? (
        <td>{person.motherName || '-'}</td>
      ) : (
        <td>
          <NavLink
            className="has-text-danger"
            to={`../${hasMather?.slug}`}
          >
            {person.motherName || '-'}
          </NavLink>
        </td>
      )}
      {!hasFather ? (
        <td>{person.fatherName || '-'}</td>
      ) : (
        <td>
          <NavLink
            to={`../${hasFather?.slug}`}
          >
            {person.fatherName || '-'}
          </NavLink>
        </td>
      )}
    </tr>
  );
};

export default PersonLink;
