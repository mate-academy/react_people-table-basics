import React, { useEffect } from 'react';
import { Person } from '../../types';
import { useSelectedPerson } from '../../context/SelectedPersonProvider';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedSlug, setSelectedSlug } = useSelectedPerson();
  const { slug } = useParams();

  useEffect(() => {
    setSelectedSlug(slug ?? null);
  }, [slug, setSelectedSlug]);

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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.motherName) || null
                  }
                  name={person.motherName}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.fatherName) || null
                  }
                  name={person.fatherName}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
