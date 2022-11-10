import { NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { getPeople } from '../../api/people';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <NavLink
          to={`/people/${parent.slug}`}
          className={cn({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parent.name}
        </NavLink>
      );
    }

    return parentName || '-';
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

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
        {people.map(person => (
          <tr
            data-cy="person"
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <NavLink
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
