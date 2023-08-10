/* eslint-disable no-console */
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';

interface PersonDataProps {
  person: Person;
  people: Person[];
}

const PersonData: React.FC<PersonDataProps> = ({ person, people }) => {
  const { slug } = useParams();

  const findMother = (peopleFromServer: Person[], child: Person) => {
    return peopleFromServer.find((mom) => mom.name === child.motherName);
  };

  const mother = findMother(people, person);

  const findFather = (peopleFromServer: Person[], child: Person) => {
    return peopleFromServer.find((dad) => dad.name === child.fatherName);
  };

  const father = findFather(people, person);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td className={classNames({ 'has-text-danger': mother })}>
        {mother ? (
          <NavLink to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </NavLink>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <NavLink to={`/people/${father.slug}`}>{father.name}</NavLink>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};

export default PersonData;
