import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people : Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <div className="block">
      <div className="box table-container">

        {people.length === 0
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
          : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columnNames.map(name => (
                    <th key={name}>{name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink
                        person={person}
                      />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother
                        ? <PersonLink person={person.mother} />
                        : person.motherName || '-'}
                    </td>
                    <td>
                      {person.father
                        ? <PersonLink person={person.father} />
                        : person.fatherName || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
