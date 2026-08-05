import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

const getRelative = (people: Person[], relativeName: string | null) => {
  if (!relativeName) {
    return null;
  }

  return people.find(person => person.name === relativeName);
};

const renderRelative = (people: Person[], relativeName: string | null) => {
  if (!relativeName) {
    return '-';
  }

  const relative = getRelative(people, relativeName);

  return relative ? <PersonLink person={relative} /> : relativeName;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => (
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
            'has-background-warning': person.slug === selectedSlug,
          })}
        >
          <td>
            <PersonLink person={person} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{renderRelative(people, person.motherName)}</td>
          <td>{renderRelative(people, person.fatherName)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
