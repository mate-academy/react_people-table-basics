import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  findEqualName: (parentName: string | null) => Person | undefined;
};

export const PersonLink = ({ person, findEqualName }: Props) => {
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams();

  const isFather = findEqualName(fatherName);
  const isMother = findEqualName(motherName);

  return (
    <tr
      data-cy="person"
      className={classNames([
        {
          'has-background-warning': person.slug === slug,
        },
      ])}
    >
      <td>
        <Link
          className={classNames([
            {
              'has-text-danger': sex === 'f',
            },
          ])}
          to={`/people/${person.slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isMother ? (
          <Link
            className={classNames([
              {
                'has-text-danger': isMother.sex === 'f',
              },
            ])}
            to={`/people/${isMother.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          <>{motherName?.trim() ? motherName : '-'}</>
        )}
      </td>
      <td>
        {isFather ? (
          <Link
            className={classNames({ 'has-text-danger': isFather?.sex === 'f' })}
            to={`/people/${isFather?.slug}`}
          >
            {fatherName}
          </Link>
        ) : (
          <>{fatherName?.trim() ? fatherName : '-'}</>
        )}
      </td>
    </tr>
  );
};
