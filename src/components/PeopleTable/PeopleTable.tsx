import { useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';

const tableTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableTitles.map(title => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => {
          const isActive = person.slug === slug;
          const isPersonFemale = person.sex === 'f';

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isActive })}
            >
              <td>
                <PersonLink
                  name={person.name}
                  slug={person.slug}
                  isFemale={isPersonFemale}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink
                    name={person.mother.name}
                    slug={person.mother.slug}
                    isFemale={true}
                  />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink
                    name={person.father.name}
                    slug={person.father.slug}
                    isFemale={false}
                  />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
