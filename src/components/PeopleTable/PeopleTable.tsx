import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../../pages/PersonLink';

type Props = {
  humans: Person[];
};

export const PeopleTable: React.FC<Props> = ({ humans }) => {
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
        {humans.map(human => (
          <tr
            data-cy="person"
            key={human.slug}
            className={classNames({
              'has-background-warning': slug === human.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${human.slug}`}
                className={classNames({ 'has-text-danger': human.sex === 'f' })}
              >
                {human.name}
              </Link>
            </td>

            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>
              <PersonLink personName={human.motherName} people={humans} />
            </td>
            <td>
              <PersonLink personName={human.fatherName} people={humans} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
