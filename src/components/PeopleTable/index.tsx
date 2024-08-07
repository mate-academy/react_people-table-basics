import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

const FEMALE = 'f';
const NONAME = '-';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personInfo } = useParams();

  const findParent = (nameParent: string | null) => {
    return people.find(person => nameParent === person.name);
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
          ({ name, sex, born, died, fatherName, motherName, slug }) => {
            const father = findParent(fatherName);
            const mother = findParent(motherName);

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': personInfo === slug,
                })}
              >
                <td>
                  <Link
                    className={classNames({
                      'has-text-danger': sex === FEMALE,
                    })}
                    to={`${slug}`}
                  >
                    {name}
                  </Link>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {!mother ? (
                    motherName || NONAME
                  ) : (
                    <Link className="has-text-danger" to={`${mother.slug}`}>
                      {motherName}
                    </Link>
                  )}
                </td>
                <td>
                  {!father ? (
                    fatherName || NONAME
                  ) : (
                    <Link to={`${father.slug}`}>{fatherName}</Link>
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
