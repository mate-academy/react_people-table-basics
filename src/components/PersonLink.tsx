import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import { useContext } from 'react';
import { UsersContext } from '../store/PeopleContext';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = useContext(UsersContext);
  const { slug } = useParams();

  const getClassName = (classNameField: string, condition: boolean) => {
    return classNames({
      [classNameField]: condition,
    });
  };

  const prepareFieldName = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const findPerson = people.find(p => p.name === parentName);

    if (!findPerson) {
      return parentName;
    }

    return (
      <NavLink
        to={`/people/${findPerson.slug}`}
        className={getClassName('has-text-danger', findPerson.sex === 'f')}
      >
        {parentName}
      </NavLink>
    );
  };

  return (
    <tr
      data-cy="person"
      className={getClassName('has-background-warning', person.slug === slug)}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={getClassName('has-text-danger', person.sex === 'f')}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{prepareFieldName(person.motherName)}</td>

      <td>{prepareFieldName(person.fatherName)}</td>
    </tr>
  );
};
