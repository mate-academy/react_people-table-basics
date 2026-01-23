import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
        {people.map(person => {
          const motherObj = people.find(p => p.name === person.motherName);
          const fatherObj = people.find(p => p.name === person.fatherName);

          const mother =
            motherObj ||
            (person.motherName ? { name: person.motherName } : null);
          const father =
            fatherObj ||
            (person.fatherName ? { name: person.fatherName } : null);

          return (
            <tr
              data-cy="person"
              key={person.slug}
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
                <PersonLink person={mother as Person} />
              </td>
              <td>
                <PersonLink person={father as Person} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
