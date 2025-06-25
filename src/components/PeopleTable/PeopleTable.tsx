import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();

  const findPersonByName = (name: string | undefined) =>
    people.find(p => p.name === name);

  return (
    <>
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
          {people &&
            people.map(person => (
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
                <td>
                  {person.motherName ? (
                    findPersonByName(person.motherName) ? (
                      <PersonLink
                        person={findPersonByName(person.motherName)!}
                      />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    findPersonByName(person.fatherName) ? (
                      <PersonLink
                        person={findPersonByName(person.fatherName)!}
                      />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
