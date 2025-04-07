import classNames from 'classnames';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <a
            href={`#/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </a>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <a href={`#/people/${person.father.slug}`}>{person.father.name}</a>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
