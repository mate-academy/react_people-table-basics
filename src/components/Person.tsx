import { Person } from '../types';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
type Props = {
  allPeople: Person[];
};

export const PersonData: React.FC<Props> = ({ allPeople }) => {
  const { slug } = useParams();

  return (
    <tbody>
      {allPeople.map(person => {
        const father = allPeople.find(m => m.name === person.fatherName);
        const mother = allPeople.find(f => f.name === person.motherName);

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {mother ? (
              <td>
                <Link
                  to={`/people/${mother.slug}`}
                  className={cn({ 'has-text-danger': mother.sex === 'f' })}
                >
                  {person.motherName}
                </Link>
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}

            {father ? (
              <td>
                <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
