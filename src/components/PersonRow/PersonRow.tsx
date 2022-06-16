import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { UpdatedPersone } from '../../types/UpdatedPersone';
import { Active } from '../../types/Active';

interface Props {
  people: UpdatedPersone[],
  active: Active,
  searchParams: URLSearchParams,
}

export const PersonRow: React.FC<Props> = ({
  people,
  active,
  searchParams,
}) => {
  const {
    nameActive,
    sexActive,
    bornActive,
    diedActive,
    fatherActive,
    motherActive,
  } = active;

  const { slug } = useParams();

  return (
    <>
      {people
        .filter(person => {
          let filter = searchParams.get('filter');

          if (!filter) {
            return true;
          }

          const name = person.name.toLowerCase();

          filter = filter.toLowerCase();
          const father = person.fatherName.toLowerCase();
          const mother = person.motherName.toLowerCase();

          return name.startsWith(filter.toLowerCase())
            || (person.fatherName && father.startsWith(filter))
            || (person.motherName && mother.startsWith(filter));
        })
        .map(person => (
          <tr
            className={classNames({
              'is-selected': person.slug === slug,
            })}
            key={person.id}
          >
            <td className={classNames({ 'is-selected': nameActive })}>
              {person.slug
                ? (
                  <NavLink
                    to={person.slug}
                    style={{ color: `${person.sex === 'm' ? 'blue' : 'red'}` }}
                  >
                    {person.name}
                  </NavLink>
                )
                : person.name}
            </td>
            <td className={classNames({ 'is-selected': sexActive })}>
              {person.sex}
            </td>
            <td className={classNames({ 'is-selected': bornActive })}>
              {person.born}
            </td>
            <td className={classNames({ 'is-selected': diedActive })}>
              {person.died}
            </td>
            <td className={classNames({ 'is-selected': fatherActive })}>
              {person.father
                ? (
                  <NavLink
                    to={person.father?.slug}
                    style={{ color: 'blue' }}
                  >
                    {person.fatherName}
                  </NavLink>
                )
                : person.fatherName || '--not found--'}
            </td>
            <td className={classNames({ 'is-selected': motherActive })}>
              {person.mother
                ? (
                  <NavLink
                    to={person.mother?.slug}
                    style={{ color: 'red' }}
                  >
                    {person.motherName}
                  </NavLink>
                )
                : person.motherName || '--not found--'}
            </td>
          </tr>
        ))}
    </>
  );
};
