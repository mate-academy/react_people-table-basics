import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const params = useParams();

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(({ name }) => name === parentName);

    if (parent) {
      const { slug, sex, name } = parent;

      return (
        <Link
          to={`../${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      );
    }

    return parentName;
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
            born,
            died,
            fatherName,
            motherName,
            sex,
            name,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': params.slug === slug,
              })}
            >
              <td>
                <Link
                  to={`../${slug}`}
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getParent(motherName)}</td>
              <td>{getParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
