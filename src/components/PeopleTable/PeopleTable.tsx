import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const getParent = (parentName: string | null) => {
    return people.find(({ name }) => name === parentName);
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
          } = person;
          const father = getParent(fatherName);
          const mother = getParent(motherName);

          return (
            <tr
              data-cy="person"
              key={slug}
            >
              <td>
                <Link
                  className={classnames({
                    'has-text-danger': sex === 'f',
                  })}
                  to={`#/people/${slug}`}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{mother ? motherName : '-'}</td>
              <td>{father ? fatherName : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
