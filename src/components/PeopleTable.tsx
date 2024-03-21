import classNames from 'classnames';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { HumanLink } from './HumanLink';

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
        {people.map(human => (
          <tr
            data-cy="person"
            key={human.slug}
            className={classNames({
              'has-background-warning': slug === human.slug,
            })}
          >
            <td aria-label={human.name}>
              <HumanLink person={human} />
            </td>

            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>

            <td>
              {human.mother ? (
                <HumanLink person={human.mother} />
              ) : (
                human.motherName || '-'
              )}
            </td>

            <td>
              {human.father ? (
                <HumanLink person={human.father} />
              ) : (
                human.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
