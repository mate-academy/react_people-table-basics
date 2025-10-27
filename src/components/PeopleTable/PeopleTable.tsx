import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import PersonLink from '../PersonLink';

type Props = {
  people: Person[];
};

const TABLE_FIELDS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const NO_PARENT = '-'; // Аж плакати хочеться

const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug: selectedPersonSlug } = useParams();

  const peopleByName = React.useMemo(() => {
    const map: Record<string, Person> = {};

    people.forEach(person => {
      map[person.name] = person;
    });

    return map;
  }, [people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_FIELDS.map(field => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = peopleByName[person.motherName || ''];
          const father = peopleByName[person.fatherName || ''];

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selectedPersonSlug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || NO_PARENT
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || NO_PARENT
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
