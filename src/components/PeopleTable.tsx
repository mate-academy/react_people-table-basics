import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
          {people.map(person => {
            const mother = people.find(p => p.name === person.motherName);
            const father = people.find(p => p.name === person.fatherName);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={
                  person.slug === selectedSlug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PeopleLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {mother ? (
                    <PeopleLink person={mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {father ? (
                    <PeopleLink person={father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
