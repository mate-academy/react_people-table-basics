import { useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
  selectedPersonSlug: string,
};

export const PeopleTable: React.FC<Props> = (props) => {
  const { people } = props;
  const [selectedPersonSlug, setSelectedPersonSlug] = useState('');

  const peopleWithParents = people?.map(person => {
    return {
      ...person,
      mother: people.find(parent => parent.name === person.motherName),
      father: people.find(parent => parent.name === person.fatherName),
    };
  });

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
        {peopleWithParents.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            mother,
            father,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={`${selectedPersonSlug === person.slug ? 'has-background-warning' : ''}`}
            >
              <td>
                <PersonLink
                  person={person}
                  setSelectedPersonSlug={setSelectedPersonSlug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink
                      person={mother}
                      setSelectedPersonSlug={setSelectedPersonSlug}
                    />
                  )
                  : (motherName || '-')}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink
                      person={father}
                      setSelectedPersonSlug={setSelectedPersonSlug}
                    />
                  )
                  : (fatherName || '-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
