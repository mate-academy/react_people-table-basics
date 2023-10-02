/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const Human: React.FC<Props> = ({
  person,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug } = useParams();
  const selectedPersonSlug = slug || '';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPersonSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherName ? (
          mother ? (
            <Link
              className={classNames({
                'has-text-danger': motherName,
              })}
              to={`../${mother?.slug}`}
            >
              {motherName}
            </Link>
          ) : (
            `${motherName}`
          )
        ) : (
          '-'
        )}
      </td>

      <td>
        {fatherName ? (
          father ? (
            <Link
              className={classNames({
                'has-text-safe': fatherName,
              })}
              to={`../${father?.slug}`}
            >
              {fatherName}
            </Link>
          ) : (
            `${fatherName}`
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
