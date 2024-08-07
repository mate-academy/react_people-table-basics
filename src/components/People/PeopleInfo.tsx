import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

enum Gender {
  Female = 'f',
  Male = 'm',
}

type Props = {
  person: Person;
  people: Person[];
};

export const PeopleInfo = ({ person, people }: Props) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { slug: identity } = useParams();

  const motherInlist = people.find(el => el.name === person.motherName);
  const fatherInlist = people.find(el => el.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': identity === slug,
      })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === Gender.Female })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherInlist ? (
          <Link
            className={cn({
              'has-text-danger': motherInlist.sex === Gender.Female,
            })}
            to={`/people/${motherInlist.slug}`}
          >
            {motherInlist.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {fatherInlist ? (
          <Link
            className={cn({
              'has-text-danger': fatherInlist.sex === Gender.Female,
            })}
            to={`/people/${fatherInlist.slug}`}
          >
            {fatherInlist.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
