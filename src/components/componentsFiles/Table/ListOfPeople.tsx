import React from 'react';
import { Person } from '../../../types/Person';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export interface ListProps {
  people: Person[];
}

export const ListOfPeople: React.FC<ListProps> = ({ people }) => {
  const { slug } = useParams();
  //
  return (
    <tbody>
      {people.map(person => {
        const findFather = people.find(p => p.name === person.fatherName);
        const findMother = people.find(p => p.name === person.motherName);
        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.motherName !== null ? (
              <td>
                {findMother !== undefined ? (
                  <PersonLink person={findMother} />
                ) : (
                  person.motherName
                )}
              </td>
            ) : (
              <td>-</td>
            )}
            {person.fatherName !== null ? (
              <td>
                {findFather !== undefined ? (
                  <PersonLink person={findFather} />
                ) : (
                  person.fatherName
                )}
              </td>
            ) : (
              <td>-</td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
