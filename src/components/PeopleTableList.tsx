import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

export const PeopleTableList = ({ person }: { person: Person }) => {
  const { slug } = useParams();

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>{<PersonLink person={person} />}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        ) : (
          <>{person.motherName}</>
        )}
        {!person.motherName && '-'}
      </td>
      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          <>{person.fatherName}</>
        )}
        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
