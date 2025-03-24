import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ people }) => {
  const { slug: selectedUserSlug } = useParams();

  const findMother = (motherName: string) => {
    const mother = people.find(person => person.name === motherName);

    if (mother) {
      return (
        <Link to={`/people/${mother.slug}`} className="has-text-danger">
          {mother.name}
        </Link>
      );
    }

    return motherName;
  };

  const findFather = (fatherName: string) => {
    const father = people.find(person => person.name === fatherName);

    if (father) {
      return <Link to={`/people/${father.slug}`}>{father.name}</Link>;
    }

    return fatherName;
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
        {people.map(
          ({ name, sex, born, died, fatherName, motherName, slug }) => (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': selectedUserSlug === `${slug}`,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>{motherName ? findMother(motherName) : '-'}</td>

              <td>{fatherName ? findFather(fatherName) : '-'}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
