import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const handleName = (person: Person | undefined, name: string | null) => {
    if (person) {
      return <PersonLink person={person} />;
    }

    return name || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
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
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {handleName(person.mother, person.motherName)}
            </td>
            <td>
              {handleName(person.father, person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
