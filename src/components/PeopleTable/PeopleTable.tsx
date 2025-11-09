import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findByName = (name: string | null) => people.find(p => p.name === name);

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
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} name={person.name} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink
                person={findByName(person.motherName)}
                name={person.motherName}
              />
            </td>

            <td>
              <PersonLink
                person={findByName(person.fatherName)}
                name={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
