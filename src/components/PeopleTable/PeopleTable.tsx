import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { peopleSlug } = useParams();

  return (
    <tbody>
      {people.map(person => {
        const foundedMother = people.find(
          mother => mother.name === person.motherName,
        );

        const foundedFather = people.find(
          father => father.name === person.fatherName,
        );

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': peopleSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {foundedMother ? (
                <PersonLink person={foundedMother} />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {foundedFather ? (
                <PersonLink person={foundedFather} />
              ) : person.fatherName ? (
                person.fatherName
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
