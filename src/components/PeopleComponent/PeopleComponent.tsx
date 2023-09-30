import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

interface Props {
  people: Person[]
}

export const PeopleComponent: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();

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
        {people.map((person) => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const findPersonMother = people
            .find(item => item.name === motherName);

          const findPersonFather = people
            .find(item => item.name === fatherName);

          const isNoMotherNameOnPeople = !findPersonMother && motherName;
          const isNoMotherOnServer = !findPersonMother && !motherName;

          const isNoFatherNameOnPeople = !findPersonFather && fatherName;
          const isNoFatherOnServer = !findPersonFather && !fatherName;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': slug === slugId,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {findPersonMother && <PersonLink person={findPersonMother} />}
                {isNoMotherNameOnPeople && `${motherName}`}
                {isNoMotherOnServer && !motherName && '-'}
              </td>
              <td>
                {findPersonFather && <PersonLink person={findPersonFather} />}
                {isNoFatherNameOnPeople && `${fatherName}`}
                {isNoFatherOnServer && '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
