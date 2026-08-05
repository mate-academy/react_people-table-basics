import React from 'react';
import { Person } from '../../../types';
import { Link as PersonLink, useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();

  return (
    <tbody>
      {people.map(cobj => {
        const isSelected = cobj.slug === slug;

        const motherPerson = people.find(
          person => person.name === cobj.motherName,
        );

        const fatherPerson = people.find(
          person => person.name === cobj.fatherName,
        );

        return (
          <tr
            key={cobj.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': isSelected })}
          >
            <td>
              <PersonLink
                className={cn({
                  'has-text-danger': cobj.sex === 'f',
                })}
                to={`/people/${cobj.slug}`}
              >
                {cobj.name}
              </PersonLink>
            </td>

            <td>{cobj.sex}</td>
            <td>{cobj.born}</td>
            <td>{cobj.died}</td>

            <td>
              {cobj.motherName ? (
                motherPerson ? (
                  <PersonLink
                    className="has-text-danger"
                    to={`/people/${motherPerson.slug}`}
                  >
                    {cobj.motherName}
                  </PersonLink>
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
                  <PersonLink to={`/people/${fatherPerson.slug}`}>
                    {cobj.fatherName}
                  </PersonLink>
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
