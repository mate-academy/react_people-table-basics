import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

interface Props {
  people: Person[];
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const { slug } = useParams();
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <NavLink
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother ? (
          <NavLink className="has-text-danger" to={`/people/${mother.slug}`}>
            {person.motherName}
          </NavLink>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>

      <td>
        {father ? (
          <NavLink to={`/people/${father.slug}`}>{person.fatherName}</NavLink>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
