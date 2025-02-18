import classNames from 'classnames';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [selectPerson, setSelectPerson] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      setSelectPerson(slug);
    }
  }, [slug]);

  const findPersonByName = (name: string | undefined | null): Person | null =>
    name
      ? people.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
      : null;

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
              'has-background-warning': person.slug === selectPerson,
            })}
            onClick={() => setSelectPerson(person.slug)}
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
                  <PersonLink person={findPersonByName(person.motherName)} />
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
                  <PersonLink person={findPersonByName(person.fatherName)} />
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
  );
};
