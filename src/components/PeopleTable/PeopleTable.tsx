import React, { useContext } from 'react';
import { PeopleContext } from '../../Context';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const { people } = useContext(PeopleContext);
  const { pathname } = useLocation();
  const sexColor = (sex: string) => {
    return classNames({ 'has-text-danger': sex === 'f' });
  };

  // #region getParents

  const getMother = (_motherName: string | null) => {
    const mother = people.find(_person => _motherName === _person.name);

    if (mother) {
      const { slug, name } = mother;

      return (
        <a className="has-text-danger" href={`#/people/${slug}`}>
          {name}
        </a>
      );
    }

    return _motherName || '-';
  };

  const getFather = (_fatherName: string | null) => {
    const father = people.find(_person => _fatherName === _person.name);

    if (father) {
      const { slug, name } = father;

      return <a href={`#/people/${slug}`}>{name}</a>;
    }

    return _fatherName || '-';
  };

  // #endregion

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const { name, sex, born, died, motherName, fatherName, slug } =
            person;

          return (
            <tr
              key={slug}
              className={classNames({
                'has-background-warning': pathname === `/people/${slug}`,
              })}
              data-cy="person"
            >
              <td>
                <a className={sexColor(sex)} href={`#/people/${slug}`}>
                  {name}
                </a>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getMother(motherName)}</td>
              <td>{getFather(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
