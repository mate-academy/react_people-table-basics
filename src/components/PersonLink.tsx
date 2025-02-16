import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const { motherName, fatherName } = person;
  const motherLinkExist = people.find(person1 => person1.name === motherName);
  const fatherLinkExist = people.find(person1 => person1.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? `has-background-warning` : ''}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherLinkExist ? (
          <NavLink
            to={`/people/${motherLinkExist.slug}`}
            className={`${motherLinkExist.sex === 'f' ? 'has-text-danger' : ''}`}
          >
            {`${person.motherName ? person.motherName : '-'}`}
          </NavLink>
        ) : (
          <>{person.motherName ? person.motherName : '-'}</>
        )}
      </td>
      <td>
        {fatherLinkExist ? (
          <NavLink
            to={`/people/${fatherLinkExist.slug}`}
            className={`${fatherLinkExist?.sex !== 'f' ? '' : 'has-text-danger'}`}
          >
            {`${person.fatherName ? person.fatherName : '-'}`}
          </NavLink>
        ) : (
          <>{person.fatherName ? person.fatherName : '-'}</>
        )}
      </td>
    </tr>
  );
};
