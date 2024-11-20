import classNames from 'classnames';
import { Person } from '../types';
import { NavLink, redirect, useLocation } from 'react-router-dom';

type Props = {
  people: Person;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ people, peopleList }) => {
  const location = useLocation();

  const isNameInTable = peopleList
    .map(person => person.name)
    .includes(people.name);

  const isFatherNameInTable = people.fatherName
    ? peopleList.map(person => person.name).includes(people.fatherName)
    : false;

  const isMotherNameInTable = people.motherName
    ? peopleList.map(person => person.name).includes(people.motherName)
    : false;

  const isFemale = (name: string) =>
    peopleList.map(person =>
     {return person.name === name && person.sex === 'f' ? true : false}
    );

  const findPersonByParentName = (name: string | null) => {
    return peopleList.find(person => person.name === name) || null;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning':
          location.pathname === `/people/${people.slug}`,
      })}
    >
      <td>
        {isNameInTable ? (
          <NavLink
            // href="#/people/jan-van-brussel-1714"
            to={`/people/${people.slug}`}
            className={classNames({ 'has-text-danger': people.sex === 'f' })}
          >
            {people.name}
          </NavLink>
        ) : (
          <p>{people.name}</p>
        )}
      </td>

      <td>{people.sex}</td>
      <td>{people.born}</td>
      <td>{people.died}</td>
      <td>
        {isMotherNameInTable ? (
          <NavLink
            to={`/people/${findPersonByParentName(people.motherName)?.slug}`}
            className={classNames({ 'has-text-danger': isFemale })}
            onClick={() => {
              redirect(
                `/people/${findPersonByParentName(people.motherName)?.slug}`,
              );
            }}
          >
            {people.motherName}
          </NavLink>
        ) : people.motherName ? (
          <p>{people.motherName}</p>
        ) : (
          <p>-</p>
        )}
      </td>
      <td>
        {isFatherNameInTable ? (
          <NavLink
            to={`/people/${findPersonByParentName(people.fatherName)?.slug}`}
            onClick={() => {
              redirect(
                `/people/${findPersonByParentName(people.fatherName)?.slug}`,
              );
            }}
          >
            {people.fatherName}
          </NavLink>
        ) : people.fatherName ? (
          <p>{people.fatherName}</p>
        ) : (
          <p>-</p>
        )}
      </td>
    </tr>
  );
};
