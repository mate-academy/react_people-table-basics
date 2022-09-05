import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PeopleLink } from './PeopleLink';
import { Person } from '../types';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const hasParrentName = (person: Person | undefined, name: string | null) => {
    if (person) {
      return <PeopleLink person={person} />;
    }

    return name || '-';
  };

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
            className={
              classNames({
                'has-background-warning': slug === person.slug,
              })
            }
          >
            <td>
              <PeopleLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {hasParrentName(person.mother, person.motherName)}
            </td>
            <td>
              {hasParrentName(person.father, person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
