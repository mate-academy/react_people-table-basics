import React from 'react';
import { Person } from '../../../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  todos: Person[];
}

export const List: React.FC<Props> = ({ todos }) => {
  const { slug } = useParams<{ slug?: string }>();

  return (
    <tbody>
      {todos.map(cobj => {
        const isSelected = cobj.slug === slug;

        const motherPerson = todos.find(
          person => person.name === cobj.motherName,
        );

        const fatherPerson = todos.find(
          person => person.name === cobj.fatherName,
        );

        return (
          <tr
            key={cobj.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': isSelected })}
          >
            <td>
              <Link
                className={cn({
                  'has-text-danger': cobj.sex === 'f',
                })}
                to={`/people/${cobj.slug}`}
              >
                {cobj.name}
              </Link>
            </td>

            <td>{cobj.sex}</td>
            <td>{cobj.born}</td>
            <td>{cobj.died}</td>

            <td>
              {cobj.motherName ? (
                motherPerson ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${motherPerson.slug}`}
                  >
                    {cobj.motherName}
                  </Link>
                ) : (
                  cobj.motherName
                )
              ) : (
                '-'
              )}
            </td>

            <td>
              {cobj.fatherName ? (
                fatherPerson ? (
                  <Link to={`/people/${fatherPerson.slug}`}>
                    {cobj.fatherName}
                  </Link>
                ) : (
                  cobj.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
