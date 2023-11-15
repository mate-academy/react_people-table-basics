import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr
      key={person.slug}
      data-cy="person"
      // onClick={() => {

      // }}
    >
      <td>
        <Link
          to={`#/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName || '-'}</td>
      <td>{person.fatherName || '-'}</td>
    </tr>
  );
};
