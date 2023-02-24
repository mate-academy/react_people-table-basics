import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
        const isSlugSelected = person.slug === selectedSlug;

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              { 'has-background-warning': isSlugSelected },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : (person.motherName || '-')}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : (person.fatherName || '-')}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
